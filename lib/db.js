import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const caCert = process.env.CA_PEM
  ? Buffer.from(process.env.CA_PEM, "base64").toString("utf-8")
  : null;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: caCert ? {
    ca: caCert,
    rejectUnauthorized: true,
  }:undefined,
});

// Ensure schools table exists
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      contact BIGINT NOT NULL,
      image TEXT NOT NULL,
      email_id TEXT NOT NULL,
        UNIQUE KEY unique_school (name(255), address(255), city(255))

    )
  `);
  console.log("✅ schools table is ready");
})();

export default pool;

