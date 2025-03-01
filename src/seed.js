import pkg from 'pg';
const { Pool } = pkg; // Importar Pool correctamente
import fs from "fs";
import 'dotenv/config';

// PostgreSQL config conexion
const pool = new Pool({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_NAME,
 password: process.env.DB_PASSWORD,
 port: process.env.DB_PORT
});

// Read JSON file
const data = JSON.parse(fs.readFileSync('./src/seed.json', 'utf-8'));
console.log(data);

// Function to insert data into telescope_types table
const insertTelescopeTypes = async () => {
 for (const type of data.telescopeTypes) {
  await pool.query(
   'INSERT INTO telescope_types (type, description) VALUES ($1, $2)',
   [type.type, type.description]
  );
 }
 console.log('Telescope types data inserted correctly');
}

// Function to insert data into telescope table
const insertTelescopes = async () => {
 for (const telescope of data.telescopes) {
  await pool.query(
   'INSERT INTO telescopes (name, description, price, brand, telescopeTypeId) VALUES ($1, $2, $3, $4, $5)',
   [telescope.name, telescope.description, telescope.price, telescope.brand, telescope.telescopeTypeId]
  );
 }
 console.log('Telescopes data inserted correctly');
}

// Execute insert functions
const seedDatabase = async () => {
 try {
  await insertTelescopeTypes();
  await insertTelescopes();
 } catch (error) {
  console.error(error);
 } finally {
  await pool.end(); // Close database connection
 }
}

seedDatabase();