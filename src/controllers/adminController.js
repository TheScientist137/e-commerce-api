import pool from "../config/db";

// Insert telescopes
export const addTelescopeController = async (req, res) => {
 const { name, description, price, brand, telescope_type_id, optical_design_id, image } = req.body;

 try {
  const addTelescopeQuery = await pool.query(
   `INSERT INTO telescopes 
     (name, description, price, brand, telescope_type_id, optical_design_id, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
   [name, description, price, brand, telescope_type_id, optical_design_id, image]
  );
  res.status(201).json(addTelescopeQuery.rows[0]);

 } catch (error) {
  console.error('Error adding new telescope', error);
  res.status(500).json({ message: 'Server error' });
 }
}

// Insert mounts
export const addMountController = async (req, res) => {
 const { name, description, price, brand, mount_type_id, image } = req.body;

 try {
  const addMountQuery = await pool.query(
   `INSERT INTO mounts
     (name. description, price, brand, mount_type_id, image)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
   [name, description, price, brand, mount_type_id, image]
  );
  res.status(201).json(addMountQuery.rows[0]);

 } catch (error) {
  console.error('Error adding new mount', error);
  res.status(500).json({ message: 'Server error' });
 }
}

// Update??

// Delete user
