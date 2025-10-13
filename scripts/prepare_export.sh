#!/usr/bin/env bash
# prepare_export.sh - collect files for a minimal export build
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
export_dir="$root/export"
rm -rf "$export_dir"
mkdir -p "$export_dir"
# Copy package.json and lockfiles
cp "$root/package.json" "$export_dir/"
if [ -f "$root/package-lock.json" ]; then cp "$root/package-lock.json" "$export_dir/"; fi
# Build before preparing if build output exists
if [ -d "$root/dist" ]; then
  cp -r "$root/dist" "$export_dir/dist"
fi
# Copy source and public assets for source-based delivery
mkdir -p "$export_dir/src"
rsync -av --exclude='node_modules' --exclude='tests' --exclude='test-results' --exclude='*.log' --exclude='.git' "$root/src/" "$export_dir/src/"
# Copy config files
for f in vite.config.ts tsconfig.json README.md LICENSE; do
  if [ -f "$root/$f" ]; then cp "$root/$f" "$export_dir/"; fi
done
# Copy a short EXPORT.md with instructions
cat > "$export_dir/EXPORT.md" <<'EOI'
# MaycoleTracker - Export Package

This export includes the minimal source and build artifacts to run MaycoleTracker.

Steps to run locally:

1. Install dependencies

  npm ci

2. Build the frontend

  npm run build

3. Start the backend

  node api_server.js

Environment variables:

- VITE_INVENTORY_API_URL (optional): If you have a backend inventory API, set this to its base URL. If not present, the app falls back to in-memory demo data.

EOI
# Print summary
echo "Prepared export in: $export_dir"
ls -la "$export_dir" | head -n 20
