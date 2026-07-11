# Notebooklm

Setup scripts for installing [`notebooklm-py`](https://pypi.org/project/notebooklm-py/) via [`uv`](https://github.com/astral-sh/uv).

## Installation

Run the setup script:

```bash
./setup.sh
```

This will:

1. Install `uv` (if not already installed) via the official install script.
2. Install `notebooklm-py` with browser support using `uv tool install`.

### Manual steps

```bash
# ติดตั้ง uv ก่อนถ้ายังไม่มี
curl -LsSf https://astral.sh/uv/install.sh | sh

# ติดตั้ง notebooklm-py
uv tool install "notebooklm-py[browser]"
```
