import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

// PostgreSQL config conexion
const pool = new Pool({
  connectionString: process.env.neon_connection_string,
});

export default pool;
