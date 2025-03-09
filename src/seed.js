import fs from "fs";
import pool from "./scripts/db.js";
import bcrypt from 'bcrypt';

// Read JSON file amd save conent on data
const data = JSON.parse(fs.readFileSync('./src/seed.json', 'utf-8'));
console.log(data);

// Function to insert telescope types  data into telescope_types table
const insertTelescopeTypes = async () => {
 for (const type of data.telescopeTypes) {
  await pool.query(
   'INSERT INTO telescope_types (type, description) VALUES ($1, $2)',
   [type.type, type.description]
  );
 }
 console.log('Telescope types data inserted correctly');
}

// Function to insert telescopes data into telescope table
const insertTelescopes = async () => {
 for (const telescope of data.telescopes) {
  await pool.query(
   'INSERT INTO telescopes (name, description, price, brand, telescopeTypeId) VALUES ($1, $2, $3, $4, $5)',
   [telescope.name, telescope.description, telescope.price, telescope.brand, telescope.telescopeTypeId]
  );
 }
 console.log('Telescopes data inserted correctly');
}

// Function to insert an admin user into users table with admin role
const insertAdnminUser = async () => {
 // obtain admin user and hash the password
 const adminUser = data.users[0];
 const hashedPassword = await bcrypt.hash(adminUser.password, 10);
 // insert admin user into database
 await pool.query(
  'INSERT INTO users (name, email, hashedPassword, role) VALUES ($1, $2, $3, $4)',
  [adminUser.name, adminUser.email, hashedPassword, adminUser.role]
 );
 console.log('Admin user inserted correctly');
}

// Execute insert functions
const seedDatabase = async () => {
 try {
  await insertTelescopeTypes();
  await insertTelescopes();
  await insertAdnminUser();
 } catch (error) {
  console.error(error);
 } finally {
  await pool.end(); // Close database connection
 }
}

seedDatabase();