import pool from "../config/db.js";
import {
 createBaseProductController,
 updateBaseProductController,
 deleteBaseProductController
} from './productsController.js';

// SELECT mounts
export const showMountsController = async (req, res) => {
 try {
  const query = await pool.query(
   `SELECT 
     products.id,
     products.name,
     products.description,
     products.price,
     products.brand,
     products.image,
     mount_types.type AS mount_type,
     mount_types.description AS mount_type_description
    FROM products
    JOIN mounts ON products.id = mounts.product_id
    JOIN mount_types ON mounts.mount_type_id = mount_types.id
    WHERE products.product_type = 'mount'
    ORDER BY products.created_at DESC`
  );
  res.status(200).json({
   message: "Mounts retrieved succesfully",
   count: query.rowCount,
   mounts: query.rows
  });
 } catch (error) {
  console.error("Erorr retrieving mounts", error);
  res.status(500).json({ message: 'Server error' });
 }
};


// INSERT mount
export const addMountController = async (req, res) => {
 const { name, description, price, brand, mount_type_id, image } = req.body;
 try {
  const baseProduct = await createBaseProductController({
   name, description, price, brand, image, product_type: 'mount'
  });
  const query = await pool.query(
   `INSERT INTO mounts (product_id, mount_type_id)
    VALUES ($1, $2) 
    RETURNING *`,
   [baseProduct.id, mount_type_id]
  );
  res.status(201).json({
   message: 'Mount added succesfully',
   newMount: { ...baseProduct, ...query.rows[0] }
  });
 } catch (error) {
  console.error('Error adding new mount', error);
  res.status(500).json({ message: 'Server error' });
 }
}

// UPDATE mount
export const updateMountController = async (req, res) => {
 const { id } = req.params;
 const { name, description, price, brand, mount_type_id, image } = req.body;

 try {
  // image config

  const updateMountQuery = await pool.query(`
      UPDATE mounts SET 
        name = $1, 
        description = $2, 
        price = $3, 
        brand = $4, 
        mount_type_id = $5, 
        image = $6
      WHERE id = $7 RETURNING *`,
   [name, description, price, brand, mount_type_id, image, id]
  );
  const newMount = updateMountQuery.rows[0];

  res.status(200).json({ message: 'Mount updated succesfully', newMount });
 } catch (error) {
  console.error('Error updating mount', error);
  res.status(500).json({ message: 'Server error - Error updating mount' });
 }
}

// DELETE mount
export const deleteMountController = async (req, res) => {
 const { id } = req.params;
 try {
  await pool.query('DELETE FROM mounts WHERE product_id = $1', [id]);
  await deleteBaseProductController(id);
  res.status(204).end();
 } catch (error) {
  console.error('Error deleting telescope', error);
  res.status(500).json({ message: 'Server error' });
 }
}
