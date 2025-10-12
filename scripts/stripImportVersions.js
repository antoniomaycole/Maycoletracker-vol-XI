#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['.git','node_modules','build','dist','venv','public'].includes(e.name)) continue
      walk(full)
    } else if (/\.tsx?$/.test(e.name) || /\.ts$/.test(e.name) || /\.jsx?$/.test(e.name)) {
      let src = fs.readFileSync(full, 'utf8')
      const orig = src
      // Replace trailing @VERSION (like @1.2.3 or @1.2.3-beta) inside module specifiers
      // e.g. from 'lucide-react@0.487.0' to 'lucide-react'
      src = src.replace(/(['\"])([^'\"]*?)@(\d+\.\d+\.\d+(?:-[^'\"]*)?)(?=\1)/g, (m, q, pkg) => {
        // pkg may be scoped '@radix-ui/react-label' if version was appended; keep pkg as-is
        return q + pkg
      })

      if (src !== orig) {
        fs.writeFileSync(full, src, 'utf8')
        console.log('Patched', full)
      }
    }
  }
}

walk(path.resolve(process.cwd(), 'src'))
console.log('Done')
