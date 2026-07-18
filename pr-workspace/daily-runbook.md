# Runbook: งาน PR ประจำวัน (ใช้โดย pr-lead / Routine)

นี่คือเวิร์กโฟลว์มาตรฐานที่ `pr-lead` (หรือ Routine อัตโนมัติ) ทำในแต่ละวัน

1. **เตรียม** — อ่าน `pr-workspace/monitoring/keywords.txt`, `pr-workspace/inbox/faq.md`
   และไฟล์ข้อความใหม่ใน `pr-workspace/inbox/` ทำ TodoWrite รายการงานของวัน
2. **Media monitoring** — spawn `pr-media-monitor` ให้สรุปข่าว/ประเด็นตาม keywords
   → ได้ `pr-workspace/monitoring/brief-<วันที่>.md`
3. **ตอบข้อความ** — ถ้ามีไฟล์ข้อความใน `inbox/` spawn `pr-community-manager` จัดหมวด + ร่างคำตอบ
   → ได้ `pr-workspace/inbox/replies-<วันที่>.md`
4. **คอนเทนต์** — spawn `pr-content-writer` ร่างโพสต์ 1–3 ชิ้นจากประเด็นเชิงบวก/สิ่งที่ควรสื่อสารในวันนั้น
   → บันทึกใน `pr-workspace/drafts/`
5. **สื่อ (ถ้าจำเป็น)** — ถ้ามีประเด็นที่ควรทำเป็นสื่อ (เช่น สรุปสถานการณ์เป็น briefing/อินโฟกราฟิก)
   spawn `pr-notebooklm-producer` (ตรวจ auth ก่อน; ข้ามได้ถ้ายังไม่ได้ login)
6. **สรุป** — รวมทุกอย่างเป็น `pr-workspace/daily-brief-<วันที่>.md` โดยเน้นประเด็น 🔴 ที่ต้องให้คนตรวจก่อน

## กฎ
- ทุกผลลัพธ์เป็น **ร่าง** — ห้าม publish/ส่งข้อความออกภายนอกเอง
- ประเด็นวิกฤต/ร้องเรียน/สื่อ/กฎหมาย ตั้งธง 🔴 "ต้องให้คนตรวจก่อน"
- ไม่แต่งข้อมูล ใช้ `[ตรวจสอบ: ...]` เมื่อไม่แน่ใจ
