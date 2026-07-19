const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  LevelFormat, BorderStyle, convertInchesToTwip,
} = require("docx");

const INK = "1B2440";
const SOFT = "4A5471";
const EMBER = "C85F1F";

const FONT = "Sarabun";

function t(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 24, color: INK, ...opts });
}

function body(children, opts = {}) {
  return new Paragraph({
    children,
    spacing: { after: 120, line: 320 },
    ...opts,
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, font: FONT, size: 32, bold: true, color: INK })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, font: FONT, size: 27, bold: true, color: EMBER })],
  });
}

function bullet(runs) {
  return new Paragraph({
    children: runs,
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80, line: 320 },
  });
}

function numbered(ref, runs, level = 0) {
  return new Paragraph({
    children: runs,
    numbering: { reference: ref, level },
    spacing: { after: 80, line: 320 },
  });
}

function note(runs) {
  return new Paragraph({
    children: runs,
    spacing: { after: 160, line: 320 },
    indent: { left: convertInchesToTwip(0.3) },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: EMBER, space: 8 } },
  });
}

const numberingConfigs = [];
const bulletConfig = {
  reference: "bullets",
  levels: [{
    level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } } },
  }],
};
function makeNumRef(name) {
  numberingConfigs.push({
    reference: name,
    levels: [
      {
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.25) } } },
      },
      {
        level: 1, format: LevelFormat.LOWER_LETTER, text: "%2)", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.7), hanging: convertInchesToTwip(0.25) } } },
      },
    ],
  });
  return name;
}

const children = [];

// ---------- Cover header ----------
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 60 },
  children: [new TextRun({ text: "คู่มือการเปิดใช้งานอีเมล NDLP", font: FONT, size: 44, bold: true, color: INK })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 60 },
  children: [new TextRun({ text: "บัญชี @ndlp.go.th สำหรับครู บุคลากร และนักเรียนในสังกัด สพฐ.", font: FONT, size: 28, color: SOFT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 240 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9C2B2", space: 12 } },
  children: [new TextRun({ text: "งานประชาสัมพันธ์ โรงเรียนดงมะไฟพิทยาคม · กรกฎาคม 2569", font: FONT, size: 22, color: SOFT })],
}));

// ---------- 1 ----------
children.push(h1("1. อีเมล NDLP คืออะไร"));
children.push(body([
  t("NDLP (National Digital Learning Platform) คือแพลตฟอร์มการเรียนรู้แห่งชาติของสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) โดยครู บุคลากร และนักเรียนทุกคนในสังกัดจะได้รับบัญชีอีเมลที่ลงท้ายด้วย "),
  t("@ndlp.go.th", { bold: true }),
  t(" เป็นของตนเอง ใช้เป็นบัญชีกลางสำหรับเข้าถึงระบบและบริการดิจิทัลเพื่อการศึกษา ได้แก่"),
]));
children.push(bullet([t("แพลตฟอร์ม NDLP — สื่อการเรียนรู้ดิจิทัล คลังสื่อ และบทเรียนออนไลน์")]));
children.push(bullet([t("ลงชื่อเข้าใช้เครื่อง Chromebook ที่ สพฐ. จัดสรรให้โรงเรียน")]));
children.push(bullet([t("Google Workspace for Education (Gmail, Drive, Docs, Classroom ฯลฯ)")]));
children.push(bullet([t("Canva Education แบบเต็มรูปแบบ โดยไม่มีค่าใช้จ่าย")]));

// ---------- 2 ----------
children.push(h1("2. สิ่งที่ต้องเตรียมก่อนเริ่ม"));
children.push(bullet([t("ครู/บุคลากร: ", { bold: true }), t("เลขประจำตัวประชาชน 13 หลัก (ชาวต่างชาติใช้เลขที่หนังสือเดินทาง) และวันเดือนปีเกิด")]));
children.push(bullet([t("นักเรียน: ", { bold: true }), t("เลขประจำตัวประชาชน 13 หลัก หรือ G-Code (นักเรียนที่ไม่มีเลขบัตรประชาชน สอบถาม G-Code ได้จากครูทะเบียน) หรือเลขที่หนังสือเดินทาง และวันเดือนปีเกิด")]));
children.push(bullet([t("อุปกรณ์ที่เชื่อมต่ออินเทอร์เน็ต (คอมพิวเตอร์ แท็บเล็ต หรือโทรศัพท์มือถือ)")]));
children.push(bullet([t("สมุดหรือที่จดบันทึก สำหรับจดอีเมลที่ระบบสร้างให้และรหัสผ่านที่ตั้งเอง")]));

// ---------- 3 ----------
children.push(h1("3. ขั้นตอนการยืนยันตัวตนและเปิดใช้งาน (ทำครั้งแรกครั้งเดียว)"));

children.push(h2("ขั้นตอนที่ 1 — เข้าเว็บไซต์ NDLP"));
const s1 = makeNumRef("step1");
children.push(numbered(s1, [t("เปิดเบราว์เซอร์ (แนะนำ Google Chrome) แล้วเข้าเว็บไซต์ "), t("www.ndlp.go.th", { bold: true, color: EMBER })]));
children.push(numbered(s1, [t("คลิกปุ่ม "), t("“เข้าสู่ระบบ”", { bold: true }), t(" มุมขวาบนของหน้าจอ")]));
children.push(numbered(s1, [t("ผู้ที่ยังไม่เคยใช้งาน ให้คลิกลิงก์ "), t("“ยืนยันตัวตน”", { bold: true }), t(" ในหน้าเข้าสู่ระบบ")]));

children.push(h2("ขั้นตอนที่ 2 — กรอกข้อมูลยืนยันตัวตน"));
const s2 = makeNumRef("step2");
children.push(numbered(s2, [t("เลือกประเภทข้อมูลที่ใช้ยืนยันตัวตน")]));
children.push(numbered(s2, [t("ครู/บุคลากร: เลขประจำตัวประชาชน หรือเลขที่หนังสือเดินทาง")], 1));
children.push(numbered(s2, [t("นักเรียน: เลขประจำตัวประชาชน เลขที่หนังสือเดินทาง หรือ G-Code")], 1));
children.push(numbered(s2, [t("กรอกเลขให้ถูกต้องครบถ้วน")]));
children.push(numbered(s2, [t("กรอกวันเดือนปีเกิดตามบัตรประชาชน")]));
children.push(numbered(s2, [t("กดปุ่มตรวจสอบ/ยืนยัน — ระบบจะแสดงชื่อ-นามสกุลขึ้นมา ให้ตรวจสอบว่าเป็นข้อมูลของตนเองจริง")]));
children.push(note([
  t("หมายเหตุ: ", { bold: true, color: EMBER }),
  t("หากระบบแจ้งว่า “ไม่พบข้อมูล” แสดงว่าข้อมูลของท่านยังไม่ถูกนำเข้าระบบจากฐานข้อมูล DMC/HRMS ให้ติดต่อครูผู้ดูแลระบบ (Admin) ของโรงเรียน", { italics: true, color: SOFT }),
]));

children.push(h2("ขั้นตอนที่ 3 — ตั้งรหัสผ่านของตนเอง"));
const s3 = makeNumRef("step3");
children.push(numbered(s3, [t("กำหนดรหัสผ่านใหม่ตามเงื่อนไขที่ระบบกำหนด (แนะนำให้มีตัวอักษรพิมพ์ใหญ่ พิมพ์เล็ก และตัวเลขปะปนกัน)")]));
children.push(numbered(s3, [t("กรอกรหัสผ่านซ้ำอีกครั้งเพื่อยืนยัน")]));
children.push(note([
  t("ข้อควรระวัง: ", { bold: true, color: EMBER }),
  t("รหัสผ่านเป็นข้อมูลส่วนบุคคล ห้ามบอกผู้อื่น และไม่ควรใช้เลขบัตรประชาชนหรือวันเกิดเป็นรหัสผ่าน", { italics: true, color: SOFT }),
]));

children.push(h2("ขั้นตอนที่ 4 — รับอีเมล @ndlp.go.th ของตนเอง"));
const s4 = makeNumRef("step4");
children.push(numbered(s4, [t("เมื่อยืนยันตัวตนและตั้งรหัสผ่านสำเร็จ ระบบจะ"), t("สร้างอีเมล (Username) ให้โดยอัตโนมัติ", { bold: true }), t(" และแสดงบนหน้าจอ")]));
children.push(numbered(s4, [t("รูปแบบอีเมลโดยทั่วไปคือชื่อภาษาอังกฤษ ตามด้วยอักษรย่อนามสกุลและตัวเลข เช่น "), t("somchai.jai1234@ndlp.go.th", { italics: true })]));
children.push(numbered(s4, [t("สำคัญมาก: ", { bold: true, color: EMBER }), t("จดบันทึกหรือถ่ายภาพหน้าจออีเมลนี้เก็บไว้ เพราะต้องใช้ทุกครั้งที่เข้าสู่ระบบ")]));

// ---------- 4 ----------
children.push(h1("4. การเข้าสู่ระบบครั้งถัดไป"));
const s5 = makeNumRef("login");
children.push(numbered(s5, [t("เข้าเว็บไซต์ www.ndlp.go.th แล้วคลิก “เข้าสู่ระบบ”")]));
children.push(numbered(s5, [t("ช่อง “อีเมล” กรอกอีเมล @ndlp.go.th ที่ได้รับ")]));
children.push(numbered(s5, [t("ช่อง “รหัสผ่าน” กรอกรหัสผ่านที่ตั้งไว้ แล้วกด “เข้าสู่ระบบ”")]));

// ---------- 5 ----------
children.push(h1("5. การนำอีเมล NDLP ไปใช้กับบริการอื่น"));
children.push(bullet([t("Chromebook สพฐ.: ", { bold: true }), t("เปิดเครื่องแล้วลงชื่อเข้าใช้ด้วยอีเมล @ndlp.go.th และรหัสผ่านเดียวกัน")]));
children.push(bullet([t("Google Workspace: ", { bold: true }), t("เข้า google.com เลือกลงชื่อเข้าใช้ (Sign in) ด้วยอีเมล @ndlp.go.th จะใช้ Gmail, Drive, Docs, Classroom ได้ตามสิทธิ์ที่ สพฐ. กำหนด")]));
children.push(bullet([t("Canva Education: ", { bold: true }), t("เข้า canva.com เลือก “Continue with Google” แล้วเลือกบัญชี @ndlp.go.th จะได้สิทธิ์ Canva สำหรับการศึกษาโดยไม่มีค่าใช้จ่าย (รายละเอียดเพิ่มเติม: public.canva.site/th-obec)")]));

// ---------- 6 ----------
children.push(h1("6. กรณีลืมรหัสผ่าน หรือลืมอีเมลของตนเอง"));
const s6 = makeNumRef("forgot");
children.push(numbered(s6, [t("เข้าเว็บไซต์ "), t("www.ndlp.go.th/forgot-password", { bold: true, color: EMBER }), t(" (หรือคลิก “ลืมรหัสผ่าน” ในหน้าเข้าสู่ระบบ)")]));
children.push(numbered(s6, [t("ยืนยันตัวตนอีกครั้งด้วยเลขบัตรประชาชน/G-Code และวันเดือนปีเกิด เช่นเดียวกับการสมัครครั้งแรก")]));
children.push(numbered(s6, [t("ระบบจะแสดงอีเมลของท่านและให้ตั้งรหัสผ่านใหม่")]));

// ---------- 7 ----------
children.push(h1("7. ช่องทางขอความช่วยเหลือ"));
children.push(bullet([t("ศูนย์ช่วยเหลือ NDLP: "), t("support.ndlp.go.th", { bold: true }), t(" และคู่มือการใช้งานที่ "), t("training.ndlp.go.th/support", { bold: true })]));
children.push(bullet([t("LINE Official: "), t("@ndlpsupport", { bold: true, color: EMBER })]));
children.push(bullet([t("ครูผู้ดูแลระบบ (Admin) ประจำโรงเรียน")]));

// ---------- 8 ----------
children.push(h1("8. คำถามที่พบบ่อย (FAQ)"));
const faqs = [
  ["ต้องเสียค่าใช้จ่ายหรือไม่", "ไม่เสียค่าใช้จ่ายใด ๆ ทั้งสิ้น เป็นสิทธิ์ของครูและนักเรียนสังกัด สพฐ. ทุกคน"],
  ["นักเรียนที่ไม่มีเลขบัตรประชาชนทำอย่างไร", "ใช้ G-Code หรือเลขที่หนังสือเดินทางยืนยันตัวตนแทนได้ สอบถาม G-Code จากครูทะเบียนของโรงเรียน"],
  ["ยืนยันตัวตนแล้วระบบแจ้งว่าไม่พบข้อมูล", "ข้อมูลอาจยังไม่ถูกนำเข้าระบบ ให้แจ้งครูผู้ดูแลระบบของโรงเรียนตรวจสอบข้อมูลในระบบ DMC"],
  ["อีเมลนี้ใช้ได้ถึงเมื่อไร", "ใช้ได้ตลอดที่ยังเป็นครู บุคลากร หรือนักเรียนในสังกัด สพฐ."],
];
for (const [q, a] of faqs) {
  children.push(body([t("ถาม: " + q, { bold: true })], { spacing: { after: 20, line: 320 } }));
  children.push(body([t("ตอบ: ", { bold: true, color: EMBER }), t(a)], { spacing: { after: 160, line: 320 } }));
}

// ---------- footer refs ----------
children.push(new Paragraph({
  spacing: { before: 240 },
  border: { top: { style: BorderStyle.SINGLE, size: 6, color: "C9C2B2", space: 12 } },
  children: [new TextRun({
    text: "ข้อมูลอ้างอิง: www.ndlp.go.th · training.ndlp.go.th/support · support.ndlp.go.th · public.canva.site/th-obec (ข้อมูล ณ กรกฎาคม 2569)",
    font: FONT, size: 20, italics: true, color: SOFT,
  })],
}));

const doc = new Document({
  numbering: { config: [bulletConfig, ...numberingConfigs] },
  styles: { default: { document: { run: { font: FONT, size: 24, color: INK } } } },
  sections: [{
    properties: {
      page: { margin: { top: 1134, bottom: 1134, left: 1440, right: 1440 } },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(__dirname + "/คู่มือการเปิดใช้งานอีเมล-NDLP.docx", buf);
  console.log("done");
});
