#!/usr/bin/env bash
# Cleanup helper - deletes common noisy files and folders that should not be in the repo
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
echo "Cleaning repository: $root"

targets=(
  "$root/package-lock 2.json"
  "$root/package-lock 3.json"
  "$root/.DS_Store"
  "$root/venv"
)

for t in "${targets[@]}"; do
  if [ -e "$t" ]; then
    echo "Removing: $t"
    rm -rf "$t"
  else
    echo "Not found: $t"
  fi
done

echo "Done. Consider running 'git status' and committing the removals if desired."
