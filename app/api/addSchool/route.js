import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");

    let imagePath = "";

    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      // Save uploaded image locally
      const image = formData.get("image");
      if (image && image.name) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public/schoolImages");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

        const filePath = path.join(uploadDir, image.name);
        fs.writeFileSync(filePath, buffer);

        imagePath = `/schoolImages/${image.name}`;
      }
    } else {
      // Production: Firebase image URL
      imagePath = formData.get("imageUrl");
    }

    // Insert into DB
    await pool.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    // ✅ Fetch all schools after insertion
    const [schools] = await pool.execute("SELECT id, name, address, city, image FROM schools ORDER BY id DESC");

    return NextResponse.json({ success: true, schools });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
