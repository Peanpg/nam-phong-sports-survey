# เว็บสำรวจเสื้อกีฬา กฟส.น้ำพอง — GitHub / Vercel

โครงการ Next.js + Neon Postgres สำหรับสร้างเว็บใหม่แยกจากเว็บรองเท้า ใช้ภาพชุดจริงและตราทีมที่เจ้าของส่งมา มีฟอร์มมือถือ ไซซ์ SS–10XL ตารางรอบอก/ความยาว สรุปตามไซซ์ ค้นหา แก้ไข ลบ และ Excel

## นำขึ้น GitHub

1. แตก ZIP แล้วสร้าง repository ใหม่ เช่น `sports-survey` ไม่ต้องแก้ repository ของรองเท้า
2. กด **uploading an existing file** หรือ **Add file → Upload files**
3. ลากไฟล์และโฟลเดอร์ทั้งหมดข้างในโฟลเดอร์ที่แตก ZIP ไปวาง ต้องเห็น `package.json` และ `app` ที่ระดับแรกของ repository
4. กด **Commit changes** ห้ามอัปโหลดไฟล์ ZIP, `.env.local`, `node_modules` หรือ `.next`

## Deploy Vercel

1. ใน Vercel สร้าง Project ใหม่ แล้ว Import repository `sports-survey` จาก GitHub
2. เลือก Framework **Next.js**, Root Directory ที่มี `package.json`, Node.js **22.x**
3. เชื่อม Neon ผ่าน **Storage → Create Database → Neon** หรือ **Connect to Project** แล้วเลือกโปรเจกต์เสื้อกีฬาและ Production
4. ใน **Settings → Environments → Production** หรือ **Environment Variables** ตรวจค่าต่อไปนี้:

| Key | Value |
|---|---|
| `DATABASE_URL` | Connection string ของ Neon (integration อาจเพิ่มให้อัตโนมัติ) |
| `ADMIN_PIN` | `4321` |

5. กด Deploy ถ้าเพิ่มค่าฐานข้อมูลหลัง deploy แล้ว ให้ไป **Deployments → ⋯ → Redeploy** รอ Ready
6. เปิดเว็บ ส่งคำตอบ แล้วเข้าสู่หน้าสรุปด้วย **4321** เพื่อทดสอบการดูข้อมูลและดาวน์โหลด Excel

**รุ่นเสื้อกีฬาสร้างตารางให้อัตโนมัติเมื่อใช้งานฐานข้อมูลครั้งแรก ไม่ต้องเปิด Query เพื่อรัน SQL เอง** บัญชีฐานข้อมูลต้องมีสิทธิ์สร้างตาราง โดย connection string ของเจ้าของฐานข้อมูล Neon รองรับขั้นตอนนี้

ตารางใช้ชื่อ `sports_responses`, `sports_admin_sessions`, `sports_pin_attempts` จึงแยกจากเว็บรองเท้า แม้ใช้ Neon ฐานข้อมูลเดียวกัน ไม่คัดลอกคำตอบรองเท้ามาปะปน และไม่ได้อ่านฐานข้อมูลของเว็บตัวอย่าง Sites

## ฟอร์มและรูปภาพ

- รหัสพนักงาน ชื่อ–นามสกุล แผนก/งาน ตำแหน่ง ความต้องการ และไซซ์เสื้อ
- คนละ 1 ตัว ไม่มีช่องจำนวนหรือหมายเหตุ
- ใช้ภาพ 1–3 ที่เจ้าของให้มาเป็นชุดจริงและตราสัญลักษณ์ กดขยายได้
- ใช้เฉพาะขนาดจากภาพ 4: SS อก34/ยาว25 ถึง 10XL อก60/ยาว38 (นิ้ว) ไม่แสดงเสื้อในภาพตารางเป็นสินค้า ไม่เพิ่มราคา
- กางเกงและถุงเท้าเป็นภาพแสดงแบบชุด ยังไม่สำรวจไซซ์กางเกง เพราะไม่มีตารางขนาด
- Excel มีคำตอบพนักงานและสรุปไซซ์เสื้อ พร้อมรอบอก/ความยาว

## ใช้งานในเครื่อง

ติดตั้ง Node.js 22 คัดลอก `.env.example` เป็น `.env.local` ใส่ค่าจริง แล้วรัน:

```sh
npm ci
npm run dev
```

เปิด `http://localhost:3000` ตรวจ build ด้วย `npm run build` และ TypeScript ด้วย `npm run typecheck`

## หากมีปัญหา

- เข้าหน้าสรุปไม่ได้/ส่งคำตอบไม่ได้: ตรวจ `DATABASE_URL` ใน Production, ตรวจสิทธิ์สร้างตาราง และเปิด Vercel Logs ดูรายละเอียด
- เปลี่ยน Environment Variables แล้ว: ต้อง Redeploy ให้ deployment ใหม่รับค่า
- ใส่รหัสผิด 5 ครั้ง: รอ 15 นาที
- ห้ามใส่ connection string จริงใน GitHub หรือส่งในภาพหน้าจอ ใช้ตัวแปรฝั่งเซิร์ฟเวอร์เท่านั้น
- การเปลี่ยน PIN ไม่ยกเลิกเซสชันที่เข้าไว้ก่อนหน้า เซสชันหมดอายุภายใน 8 ชั่วโมง

คู่มือทางการ: [Vercel environment variables](https://vercel.com/docs/environment-variables), [Neon integration](https://vercel.com/marketplace/neon/neon)
