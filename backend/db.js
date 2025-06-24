const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "meeting_assistant",
  password: String(process.env.PGPASSWORD) || "arya11",  // 👈 force to string
  port: parseInt(process.env.PGPORT) || 5432,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch(err => console.error("❌ PostgreSQL Connection Failed", err));

module.exports = pool;
