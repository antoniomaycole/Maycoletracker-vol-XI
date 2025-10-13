#!/usr/bin/env bash
set -euo pipefail

# Script to move test-* files from src/ into src/REMOVED/
# and to move markdown files from src/ into docs/archive/ preserving relative paths.

ROOT="$(pwd)"
SRC="$ROOT/src"
REMOVED="$SRC/REMOVED"
ARCHIVE="$ROOT/docs/archive"

mkdir -p "$REMOVED"
mkdir -p "$ARCHIVE"

echo "Moving test-* files under $SRC to $REMOVED (preserving subdirs)..."
# Find files with basename starting with test- (any extension) under src
find "$SRC" -type f -name 'test-*' -print0 | while IFS= read -r -d '' f; do
  # skip anything already under REMOVED
  case "$f" in
    "$REMOVED"/*) continue ;;
  esac
  rel="${f#$SRC/}"
  dest_dir="$REMOVED/$(dirname "$rel")"
  mkdir -p "$dest_dir"
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git mv --force "$f" "$dest_dir/" || mv -f "$f" "$dest_dir/"
  else
    mv -f "$f" "$dest_dir/"
  fi
  echo "Moved: $rel -> ${dest_dir}/"
done

# Also move any test-*.html under public/ (if present)
if [ -d "$SRC/public" ]; then
  find "$SRC/public" -type f -name 'test-*' -print0 | while IFS= read -r -d '' f; do
    rel="${f#$SRC/}"
    dest_dir="$REMOVED/public/$(dirname "${rel#public/}")"
    mkdir -p "$dest_dir"
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git mv --force "$f" "$dest_dir/" || mv -f "$f" "$dest_dir/"
    else
      mv -f "$f" "$dest_dir/"
    fi
    echo "Moved public test: $rel -> ${dest_dir}/"
  done
fi

# Move markdown files from src/ (all .md under src) to docs/archive preserving paths
echo "Moving .md files under $SRC to $ARCHIVE (preserving subdirs), skipping README.md files..."
find "$SRC" -type f -name '*.md' -print0 | while IFS= read -r -d '' f; do
  # skip files already in docs or REMOVED
  case "$f" in
    "$ARCHIVE"/*) continue ;;
    "$REMOVED"/*) continue ;;
  esac
  base="$(basename "$f")"
  # skip README.md at src root
  if [ "$base" = "README.md" ]; then
    echo "Skipping README.md: $f"
    continue
  fi
  rel="${f#$SRC/}"
  dest_dir="$ARCHIVE/$(dirname "$rel")"
  mkdir -p "$dest_dir"
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git mv --force "$f" "$dest_dir/" || mv -f "$f" "$dest_dir/"
  else
    mv -f "$f" "$dest_dir/"
  fi
  echo "Moved MD: $rel -> ${dest_dir}/"
done

# Summary
echo
echo "Done. The following locations were used:"
echo "  - Removed/Test archive: $REMOVED"
echo "  - MD archive: $ARCHIVE"

echo "Run 'git status' to review changes, then commit as desired."

echo "Running a TypeScript check now (npx tsc --noEmit) to catch errors..."

if command -v npx >/dev/null 2>&1; then
  npx -y tsc --noEmit || echo "TypeScript check failed — please review errors above."
else
  echo "npx not found; skip TS check."
fi
