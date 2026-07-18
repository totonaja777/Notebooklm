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

## ทีมประชาสัมพันธ์อัตโนมัติ (PR Agent Team)

repo นี้มีทีม subagent สำหรับงานประชาสัมพันธ์ที่ทำงานร่วมกันและตั้งรันอัตโนมัติผ่าน cloud ได้:
media monitoring, เขียนคอนเทนต์/โพสต์โซเชียล, ดูแล/ตอบข้อความ และผลิตสื่อจาก NotebookLM

- นิยาม agent: `.claude/agents/pr-*.md`
- คู่มือ + การตั้ง Routine อัตโนมัติ: [`docs/pr-team.md`](docs/pr-team.md)
- พื้นที่ทำงาน (ร่าง/รายงาน): `pr-workspace/`

เริ่มใช้: `ใช้ pr-lead รันงาน PR ประจำวัน`
