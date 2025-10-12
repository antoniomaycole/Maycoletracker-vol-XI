const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic health endpoint
app.get('/health', (req, res) => {
	res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Inventory stub endpoints (replace with DB integration in production)
const inMemoryInventory = [];
const inMemoryAlerts = [];

app.get('/inventory', (req, res) => {
	res.json({ items: inMemoryInventory });
});

app.post('/inventory', (req, res) => {
	const item = req.body;
	if (!item || !item.id) return res.status(400).json({ error: 'Invalid item payload' });
	inMemoryInventory.push(item);
	res.status(201).json({ success: true, item });
});

// Alerts endpoint - accept low-stock / system alerts
app.post('/alerts', (req, res) => {
	const alert = req.body;
	if (!alert || !alert.name || !alert.message) return res.status(400).json({ error: 'Invalid alert payload' });
	alert.id = alert.id || Math.random().toString(36).slice(2,9);
	alert.receivedAt = new Date().toISOString();
	inMemoryAlerts.push(alert);
	console.log('Received alert:', alert.message);
	res.status(201).json({ success: true, alert });
});

app.get('/alerts', (req, res) => {
	res.json({ alerts: inMemoryAlerts });
});

// Expose package.json for dependency scans (read-only). This helps the
// DependenciesAIAgent fetch metadata from the running dev server or preview.
app.get('/package.json', (req, res) => {
	try {
		// require from project root (api_server.js is in src/)
		// use require to leverage Node's JSON parsing and caching
		// fallback to fs read if needed
		let pkg;
		try {
			pkg = require('../package.json');
		} catch (e) {
			const fs = require('fs');
			const raw = fs.readFileSync(require('path').resolve(__dirname, '..', 'package.json'), 'utf8');
			pkg = JSON.parse(raw);
		}

		// Remove any top-level fields we definitely don't want to expose
		// (package.json typically doesn't contain secrets, but be conservative)
		const safe = { ...pkg };
		delete safe.scripts; // scripts can contain commands, remove if you prefer

		res.json(safe);
	} catch (err) {
		console.error('Failed to read package.json', err);
		res.status(500).json({ error: 'Unable to read package metadata' });
	}
});


// Start server when run directly
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`API server listening on port ${PORT}`);
});

// --- Dependency scan endpoints ---
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

let depsCache = null;
let depsCacheTs = 0;
const DEPS_CACHE_TTL = 1000 * 60 * 10; // 10 minutes

function sanitizeAuditOutput(pkg, auditJson) {
	// Build a conservative, sanitized summary from audit output
	const summary = {
		timestamp: new Date().toISOString(),
		project: { name: pkg.name || null, version: pkg.version || null },
		dependencies: [],
		summary: { totalDeps: 0, vulnerableCount: 0, highSeverityCount: 0 }
	};

	// Dependencies list from package.json
	const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
	summary.summary.totalDeps = Object.keys(deps).length;

	// If auditJson has advisories or vulnerabilities, map them
	const vulns = (auditJson && auditJson.vulnerabilities) || {};

	for (const name of Object.keys(deps)) {
		const requestedVersion = deps[name];
		const vuln = vulns[name];
		const item = {
			name,
			requestedVersion,
			resolvedVersion: (auditJson && auditJson.metadata && auditJson.metadata.dependencies && auditJson.metadata.dependencies[name]) || null,
			latestVersion: null,
			isDev: !!(pkg.devDependencies && pkg.devDependencies[name]),
			riskFlags: [],
			vulnerabilities: []
		};

		if (vuln) {
			summary.summary.vulnerableCount += 1;
			// copy minimal vulnerability info
			const severity = vuln.severity || 'moderate';
			item.vulnerabilities.push({ id: vuln.name || name, severity, title: vuln.title || 'Vulnerability' });
			if (severity === 'high' || severity === 'critical') summary.summary.highSeverityCount += 1;
		}

		summary.dependencies.push(item);
	}

	return summary;
}

async function runAuditScan() {
	const root = path.resolve(__dirname, '..');
	const pkgPath = path.join(root, 'package.json');
	let pkg = {};
	try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')); } catch (e) { pkg = {}; }

	// Try npm audit first
	try {
		// run npm audit --json in project root
		const cmd = 'npm audit --json';
		const audit = await new Promise((resolve, reject) => {
			exec(cmd, { cwd: root, maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
				if (err && !stdout) return reject(err);
				try { resolve(JSON.parse(stdout || '{}')); } catch (e) { resolve(null); }
			});
		});

		const result = sanitizeAuditOutput(pkg, audit);
		depsCache = result;
		depsCacheTs = Date.now();
		return result;
	} catch (err) {
		// Fallback: return dependency manifest from package.json only
		const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
		const dependencies = Object.keys(deps).map((name) => ({ name, requestedVersion: deps[name], isDev: !!(pkg.devDependencies && pkg.devDependencies[name]) }));
		const fallback = { timestamp: new Date().toISOString(), project: { name: pkg.name || null, version: pkg.version || null }, dependencies, summary: { totalDeps: dependencies.length, vulnerableCount: 0, highSeverityCount: 0 } };
		depsCache = fallback;
		depsCacheTs = Date.now();
		return fallback;
	}
}

// GET cached or trigger scan if stale
app.get('/api/deps/summary', async (req, res) => {
	try {
		if (depsCache && (Date.now() - depsCacheTs) < DEPS_CACHE_TTL) {
			return res.json({ cached: true, data: depsCache });
		}
		const data = await runAuditScan();
		return res.json({ cached: false, data });
	} catch (err) {
		console.error('deps summary failed', err);
		res.status(500).json({ error: 'Dependency scan failed' });
	}
});

// POST to trigger a fresh scan (sync) — callers may prefer to call GET which returns cached
app.post('/api/deps/scan', async (req, res) => {
	try {
		const data = await runAuditScan();
		res.json({ success: true, data });
	} catch (err) {
		console.error('deps scan failed', err);
		res.status(500).json({ error: 'Dependency scan failed' });
	}
});

