#!/usr/bin/env bash
set -euo pipefail

# ติดตั้ง uv ก่อนถ้ายังไม่มี
if ! command -v uv &> /dev/null; then
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
fi

# ติดตั้ง notebooklm-py
uv tool install "notebooklm-py[browser]"
