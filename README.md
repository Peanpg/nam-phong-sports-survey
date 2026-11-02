# เว็บสำรวจเสื้อกีฬา — ชุดอัปโหลดเป็นไฟล์ล้วน

1. แตก ZIP แล้วเปิดโฟลเดอร์ที่แตกออกมา จะพบเฉพาะไฟล์ ไม่มีโฟลเดอร์ให้เลือก
2. เข้า GitHub repository เดิม → Add file → Upload files → choose your files
3. เลือกไฟล์ทั้งหมดในโฟลเดอร์นี้ แล้วกด Open รออัปโหลดครบ
4. กด Commit changes เพื่อเพิ่มไฟล์ใหม่และแทนที่ไฟล์ชื่อเดิม รวมถึง package.json
5. Vercel จะเริ่ม deploy ใหม่ ถ้าไม่เริ่ม ให้กด Redeploy ของ deployment ล่าสุด

ต้องเห็นไฟล์ prepare-project.mjs และ project-source.json บน GitHub และ package.json ต้องมี build เป็น node prepare-project.mjs && next build --webpack

ใช้ Framework Next.js, Root Directory ราก repository และ Build Command npm run build ตาม vercel.json

ชุดนี้มีโค้ดและรูปครบใน project-source.json และจะสร้างโฟลเดอร์ app/components/lib/public ก่อน build ทุกครั้ง ไม่ต้องอัปโหลดโฟลเดอร์เอง ไม่ต้องอัปโหลด node_modules หรือ .next

เชื่อม Neon กับโปรเจกต์ Vercel นี้ ให้มี DATABASE_URL สำหรับ Production และ ADMIN_PIN=4321 แล้ว Redeploy หากเพิ่งเพิ่มค่า ระบบสร้างตาราง sports_* ให้อัตโนมัติ แยกจากคำตอบรองเท้า

เว็บมือถือ ไซซ์ SS–10XL พร้อมรอบอก/ความยาว รูปชุดจริงและตรา หน้าสรุป แก้ไข/ลบ และ Excel เหมือนชุดปกติ ไม่มีข้อมูลคำตอบหรือรหัสฐานข้อมูลจริงในไฟล์

สำหรับผู้พัฒนา: project-source.json เป็นแหล่งโค้ดของชุดนี้ prepare-project.mjs เขียนทับไฟล์ในโฟลเดอร์ที่สร้างขึ้นทุกครั้ง หากต้องแก้ source โดยตรงควรใช้โครงการชุดโครงสร้างปกติ
