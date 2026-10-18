# NCB Project Documentation

เอกสารภาษาไทยสำหรับโครงการรายงาน NCB ของ บสย. สร้างด้วย [Nextra](https://nextra.site/) และ Next.js ส่งออกเป็น static HTML พร้อม sidebar, สารบัญ, dark mode และ Pagefind search

## เริ่มใช้งาน

ต้องใช้ Node.js 22 ขึ้นไป

```sh
npm ci
npm run dev
```

เปิด http://localhost:3000 สำหรับ development การค้นหาต้องใช้ production build ที่สร้างดัชนีแล้ว

## สร้าง HTML และเปิดอ่าน

```sh
npm run check
npm run build
npm run preview
```

ผลลัพธ์อยู่ใน `out/` และ preview อยู่ที่ http://localhost:3000 ใช้ HTTP server เพื่อให้ routing และ search ทำงานครบ ไม่เปิด `index.html` ผ่าน file:// โดยตรง

`npm run build` สร้าง HTML และรัน Pagefind ต่ออัตโนมัติ ไม่ต้องใช้ Node.js server ในระบบ hosting ที่นำโฟลเดอร์ `out/` ไปวาง

## หมวดเอกสาร

- ภาพรวมและขอบเขต Consumer / Commercial
- กระบวนการและแหล่งข้อมูล EOD / EOM / DWH
- พจนานุกรมฟิลด์ 9 ตาราง ครอบคลุม 3 ชุด Mapping × 3 ประเภทรายงาน
- กฎ DFD, DPD, TDR และ Amount Past Due
- สถานะบัญชีและหยุดนำส่ง
- ฐานข้อมูลและประวัติข้ามปี
- กรณีทดสอบและ UAT
- ประเด็นที่ต้องยืนยัน 18 รายการ
- ทะเบียนเอกสารต้นทาง 11 ไฟล์และคำศัพท์

มี Flowchart 11 ผังในหมวดกระบวนการข้อมูล กฎธุรกิจ สถานะบัญชี ฐานข้อมูล และ UAT ใช้ Mermaid ของ Nextra พร้อมคำกำกับจุดที่ต้องยืนยัน ผังด้าน UAT และขั้นควบคุมที่เสนอไม่ได้แสดงว่าดำเนินการแล้ว

## โครงสร้าง

```text
app/                      หน้าเอกสาร MDX และ theme layout
app/fields/               ตาราง Mapping ตามเอกสาร
data/source-manifest.json ชื่อ ขนาด และ SHA-256 ของแหล่งต้นทาง
scripts/check-docs.mjs    ตรวจลิงก์ภายใน โครงตาราง และทะเบียนแหล่งข้อมูล
scripts/preview.mjs       HTTP server สำหรับ preview static export
.github/workflows/        CI build และเก็บ HTML artifact
```

แก้หน้า `app/<หมวด>/page.mdx` และปรับลำดับเมนูใน `_meta.js` เมื่อเพิ่มหมวดใหม่ รักษารหัสอ้างอิง S01–S11 และบันทึกผลยืนยันในหน้า open-questions ก่อนเปลี่ยนกฎ

## การเผยแพร่

Workflow สร้าง artifact `ncb-docs-html` ให้ดาวน์โหลดจาก GitHub Actions แต่ไม่เปิดเผยเว็บโดยอัตโนมัติ นำเนื้อหา `out/` ไปวางบน static hosting ที่ต้องการได้

สำหรับ hosting ใต้ subpath เช่น `/eodncb` ให้ตั้ง `DOCS_BASE_PATH=/eodncb` ใน environment ตอน build และ preview หากต้องใช้ GitHub Pages ให้กำหนด base path นี้ตอน build และเลือก publishing workflow ขององค์กรเอง

## ขอบเขตข้อมูล

สรุปจากเอกสารที่ได้รับวันที่ 18 ตุลาคม 2569 ไม่ใช่การยืนยันข้อกำหนด NCB ฉบับล่าสุดหรือผลทดสอบ production ไม่มีไฟล์ต้นฉบับ เลข LG จริง หรือข้อมูลตัวอย่างรายบุคคลใน repository

ชื่อฟิลด์ในตารางเก็บตามต้นฉบับ รวมชื่อที่อาจพิมพ์ผิด เพื่อเทียบกลับได้ รายการข้อขัดแย้งแยกไว้ชัดเจน ไม่อนุมานการอนุมัติ UAT จากข้อความ Success หรือ remark

## ความเข้ากันได้และผลตรวจ

ฟอนต์และขนาดตัวอักษรอ้างอิง `yukasung/mattersolv_docs` commit `67b31f7` โดยใช้ system sans-serif และ typography มาตรฐานของ Nextra 4.6.1 รวมถึง font-feature-settings ของต้นทาง ไม่โหลด webfont เพิ่ม หัวข้อหลัก 36px หัวข้อระดับ 2 เป็น 30px หัวข้อระดับ 3 เป็น 24px เนื้อหาและตาราง 16px; ฟอนต์จริงที่ใช้แสดงภาษาไทยขึ้นอยู่กับระบบของผู้เปิดเว็บเช่นเดียวกับต้นทาง

ใช้ Next.js 15.5.28 กับ Nextra 4.6.1 และตรึง Zod 4.1.12 ผ่าน overrides เนื่องจากรุ่นใหม่เปลี่ยนการตรวจค่า optional ของ schema ใน Nextra Layout ให้คง lockfile และตรวจ build เมื่อเปลี่ยน dependency

ตรวจ `npm run check` ผ่านสำหรับ 21 หน้า ลิงก์ภายใน 62 จุด และทะเบียนต้นทาง 11 รายการ; production build สร้าง HTML ครบและ Pagefind index 21 หน้า ตรวจลิงก์ใน HTML ที่ส่งออกแล้วไม่พบลิงก์ภายในเสีย ตรวจการแสดง Flowchart ทั้ง 11 ผังในเบราว์เซอร์แล้ว รวมการแสดงข้อความไทยและการเลื่อนแนวนอนบนหน้าจอแคบ

Pagefind ตรวจพบภาษาไทย แต่ไม่รองรับ stemming ภาษาไทย จึงไม่ขยายคำค้นจากรากศัพท์โดยอัตโนมัติ

`npm audit` ณ วันที่จัดทำยังรายงาน dependency ทางอ้อม 15 รายการ (high 6, moderate 2, low 7) ในสาย dependency ของ Nextra/Next.js รวมถึงเครื่องมือ parse XML, glob, math และ CSS ยังไม่ได้ใช้ `audit fix --force` ซึ่งเสนอให้เปลี่ยน major version เว็บส่งออกเป็น static HTML; ก่อนเปลี่ยนไปใช้ server runtime หรือ build เนื้อหาจากแหล่งที่ไม่เชื่อถือ ควรทบทวน dependency เหล่านี้อีกครั้ง
