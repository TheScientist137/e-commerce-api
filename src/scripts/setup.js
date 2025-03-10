import fs from "fs";
import pool from "../config/db.js";

const schema = fs.readFileSync("./scripts/schema.sql", "utf-8");

const setupDatabase = async () => {
 try {
  await pool.query(schema);
  console.log("Esquema aplicado correctamente.");
 } catch (error) {
  console.error("Error al aplicar el esquema:", error);
 } finally {
  await pool.end(); // Cerrar la conexión
 }
};

setupDatabase();
