#!/usr/bin/env bash
# Idempotent environment setup for the brand-deck-builder scripts.
# Safe to re-run; skips work that's already done.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Installing Playwright (npm)..."
  npm install --silent
fi

echo "Ensuring Chromium is installed for Playwright..."
npx playwright install chromium

if [ ! -d .venv ]; then
  echo "Creating Python venv..."
  python3 -m venv .venv
fi

echo "Installing Python deps (python-pptx, Pillow)..."
./.venv/bin/pip install --quiet --upgrade pip
./.venv/bin/pip install --quiet -r requirements.txt

echo "Environment ready."
