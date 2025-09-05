import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ✅ Fetch all schools
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    return NextResponse.json({ success: true, schools: rows });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
