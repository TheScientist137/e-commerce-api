import fs from "fs";
import pool from "../config/db.js";
import bcrypt from 'bcrypt';

// Read JSON file and save conent on data
const data = JSON.parse(fs.readFileSync('./src/seed.json', 'utf-8'));
console.log(data);

// IMPROVE THIS FUNCTIONS
// Function to insert telescope types data into telescope_types table
const insertTelescopeTypes = async () => {
 for (const telescopeType of data.telescope_types) {
  await pool.query(
   'INSERT INTO telescope_types (type, description) VALUES ($1, $2)',
   [telescopeType.type, telescopeType.description]
  );
 }
 console.log('Telescope types data inserted correctly');
}

// Function to insert optical designs data into optical_designs table
const insertOpticalDesigns = async () => {
 for (const opticalDesign of data.optical_designs) {
  await pool.query(
   'INSERT INTO optical_designs (type, description) VALUES ($1, $2)',
   [opticalDesign.type, opticalDesign.description]
  );
 }
 console.log('Optical designs inserted correctly');
}

// Function to insert mount types data into mount_types table
const insertMountTypes = async () => {
 for (const mountType of data.mount_types) {
  await pool.query(
   'INSERT INTO mount_types (type, description) VALUES ($1, $2)',
   [mountType.type, mountType.description]
  );
 }
 console.log('Mount types data inserted correctly');
}

// Function to insert telescopes data into telescope table
const insertTelescopes = async () => {
 for (const telescope of data.telescopes) {
  await pool.query(
   `INSERT INTO telescopes 
    (name, description, price, brand, telescope_type_id, optical_design_id, image) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
   [
    telescope.name,
    telescope.description,
    telescope.price,
    telescope.brand,
    telescope.telescope_type_id,
    telescope.optical_design_id,
    telescope.image
   ]
  );
 }
 console.log('Telescopes data inserted correctly');
}

// Function to insert mounts data into mount table
const insertMounts = async () => {
 for (const mount of data.mounts) {
  await pool.query(
   `INSERT INTO mounts 
    (name, description, price, brand, mount_type_id, optical_design_id, image) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
   [
    mount.name,
    mount.description,
    mount.price, 
    mount.brand,
    mount.mount_type_id,
    mount.image
   ]
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

// Function to seed the databse with the insert functions above
const seedDatabase = async () => {
 try { // Execute insert functions
  await insertTelescopeTypes();
  await insertOpticalDesigns();
  await insertMountTypes();
  await insertTelescopes();
  await insertMounts();
  await insertAdnminUser();
 } catch (error) {
  console.error(error);
 } finally {
  await pool.end(); // Close database connection
 }
}

seedDatabase();