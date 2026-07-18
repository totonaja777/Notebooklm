# ทีมประชาสัมพันธ์อัตโนมัติ (PR Agent Team)

ทีม subagent สำหรับงานประชาสัมพันธ์แบบครบวงจร ทำงานร่วมกันได้ใน Claude Code และ
ตั้งให้ **รันอัตโนมัติผ่าน cloud** ด้วย Routine (scheduled trigger)

## สมาชิกทีม

| Agent | บทบาท | งานหลัก |
|-------|-------|---------|
| `pr-lead` | หัวหน้าทีม (orchestrator) | วางแผน แจกงาน รวมผล ทำ daily brief |
| `pr-media-monitor` | ติดตามข่าว | สรุปข่าว/ประเด็นสาธารณะ ประเมินโทน ตั้งธงประเด็นเสี่ยง |
| `pr-content-writer` | นักเขียนคอนเทนต์ | โพสต์โซเชียล (FB/IG/X/LINE), แคปชั่น, ข่าวประชาสัมพันธ์ |
| `pr-community-manager` | ดูแลชุมชน | จัดหมวด + ร่างคำตอบข้อความ/คอมเมนต์, ดูแล FAQ |
| `pr-notebooklm-producer` | โปรดิวเซอร์สื่อ | ทำ podcast/สรุป/อินโฟกราฟิก จากข้อมูลด้วย `notebooklm-py` |

ไฟล์นิยาม agent อยู่ที่ `.claude/agents/*.md`

## Connectors (Gmail / Google Drive / Notion / Canva)

ทีมต่อ connector ภายนอกไว้ตามหน้าที่ — หลักความปลอดภัย: **ร่าง/สร้างเท่านั้น ไม่ส่ง/ไม่เผยแพร่เอง**

| Connector | ใครใช้ | ทำอะไร |
|-----------|--------|--------|
| **Gmail** | community-manager, pr-lead | อ่านอีเมลเข้า → ร่างคำตอบเป็น **Draft** (ไม่มีคำสั่งส่งใน connector) |
| **Google Drive** | content-writer, media-monitor, producer, pr-lead | บันทึกร่างเป็น Google Doc, อัปโหลดไฟล์สื่อ (เรียกใช้ต้องกดอนุมัติต่อครั้ง) |
| **Notion** | ทุกตัว | ลง media brief, ปฏิทินคอนเทนต์, daily brief ลง workspace |
| **Canva** | content-writer, producer | ทำภาพ/โปสเตอร์ตาม brand kit — ร่างในบัญชี Canva |

connector ถูกประกาศไว้ในช่อง `tools:` ของไฟล์ `.claude/agents/pr-*.md` (ชื่อ `mcp__Gmail__*`,
`mcp__Google_Drive__*`, `mcp__Notion__*`, `mcp__Canva__*`) ต้องเชื่อม connector เหล่านี้ในบัญชี
Claude ก่อนใช้งาน หากยังไม่ต่อ agent จะข้ามขั้นตอน connector และทำงานกับไฟล์ในเครื่องแทน

> Gmail connector ให้เฉพาะ `create_draft` (ไม่มี send) — ปลอดภัยโดยดีไซน์ ระบบจึงส่งอีเมลเองไม่ได้

## โครงพื้นที่ทำงาน

```
pr-workspace/
├── monitoring/     # keywords.txt (ตั้งค่า) + brief-<วันที่>.md (ผลลัพธ์)
├── drafts/         # ร่างคอนเทนต์/โพสต์
├── inbox/          # faq.md + ข้อความเข้า + replies-<วันที่>.md
├── media/          # ไฟล์สื่อจาก NotebookLM (ไม่ commit เข้า git)
└── daily-brief-<วันที่>.md   # รายงานรวมประจำวันจาก pr-lead
```

## วิธีใช้แบบ manual

เรียกทั้งทีมผ่านหัวหน้าทีม:
```
ใช้ pr-lead รันงาน PR ประจำวัน
```
หรือเรียกทีละสาย เช่น "ใช้ pr-content-writer ร่างโพสต์เปิดตัวโครงการ X สำหรับ Facebook"

## การตั้งค่าก่อนใช้งานจริง

1. แก้ `pr-workspace/monitoring/keywords.txt` ให้เป็นชื่อองค์กร/แบรนด์/ประเด็นที่ต้องติดตาม
2. เติม `pr-workspace/inbox/faq.md` ด้วยข้อมูลจริง (เวลาทำการ ช่องทางติดต่อ ฯลฯ)
3. วางข้อความที่ต้องตอบไว้ใน `pr-workspace/inbox/` (ไฟล์ .md/.txt/.csv)
4. สำหรับสื่อ NotebookLM: ติดตั้งด้วย `./setup.sh` แล้ว `notebooklm login` (ดู `.claude/skills/notebooklm/SKILL.md`)

## การรันอัตโนมัติผ่าน cloud (Routine)

ระบบตั้ง Routine ประจำวันที่ **ยิงเข้า session ใหม่บน cloud** ทุกเช้า เพื่อให้ `pr-lead`
รันเวิร์กโฟลว์ PR ประจำวัน (media monitoring → ร่างคอนเทนต์ → ร่างคำตอบข้อความ → สรุป brief)

- ชนิด: fresh session ต่อการยิงหนึ่งครั้ง (แต่ละวันเริ่มสะอาด)
- เวลา: ทุกวัน ~08:00 น. เวลาไทย (01:00 UTC)
- ผลลัพธ์: ร่างทั้งหมดถูกบันทึกใน `pr-workspace/` และมีการแจ้งเตือนเมื่อรันเสร็จ

### ขอบเขตความปลอดภัย

- ทุกงานที่ทีมผลิตเป็น **"ร่าง" เท่านั้น** — ระบบจะไม่โพสต์/ส่งข้อความออกภายนอกเอง
- ประเด็นวิกฤต/ร้องเรียน/คำถามสื่อ/กฎหมาย จะถูกตั้งธง 🔴 "ต้องให้คนตรวจก่อน"
- ข้อมูลที่ไม่ยืนยันจะถูกเว้นเป็น `[ตรวจสอบ: ...]` ไม่แต่งข้อมูลขึ้นเอง

### ตั้ง Routine ให้พก connector (สร้างเองจากหน้า Routines)

Routine ที่จะให้รอบอัตโนมัติใช้ Gmail/Notion/Canva/Drive ได้ ต้องถูกสร้างจากที่ที่เลือก connector
ได้ — ทำเองที่ **claude.ai → Routines** ตามสเปกนี้:

| ช่อง | ค่า |
|------|-----|
| Name | ทีม PR อัตโนมัติ — งานประจำวัน |
| Schedule | ทุกวัน 08:00 น. (ไทย) = cron `0 1 * * *` (01:00 UTC) |
| Environment | Default (env_019Mz3zaUAVTNtwbVpkh2Geb) |
| Mode | สร้าง session ใหม่ทุกครั้งที่ยิง |
| Connectors | เลือก **Gmail, Google Drive, Notion, Canva** |
| Notifications | Push |
| Prompt | คัดลอกจาก `pr-workspace/routine-prompt.txt` |

จากนั้น **ปิด/ลบ Routine เดิม** ชื่อเดียวกัน (`trig_017fA2TwKF2SMAfYW6ovmKQR`) เพื่อไม่ให้รันซ้ำวันละสองรอบ

### จัดการ Routine

ดู/แก้/ลบ Routine ได้ผ่านผู้ช่วย เช่น "แสดง Routine ทั้งหมด", "เปลี่ยนเวลารันทีม PR เป็น 9 โมง",
หรือ "ปิด Routine ทีม PR"
