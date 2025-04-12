import pool from "../config/db.js";

export const addProductController = async (req, res) => {
 const {
  name,
  description,
  brand,
  price,
  image,
  product_type,
  telescope_type_id,
  optical_design_id,
  mount_type_id
 } = req.body;

 // Validate product and spicifics fields 
 if (!name || !description || !brand || !price || !product_type) {
  return res.status(400).json({ message: 'Basic product fields are required' });
}
if (product_type === 'telescope' && (!telescope_type_id || !optical_design_id)) {
  return res.status(400).json({ 
    message: 'Telescope type and optical design are required for telescopes' 
  });
}
if (product_type === 'mount' && !mount_type_id) {
  return res.status(400).json({ 
    message: 'Mount type is required for mounts' 
  });
}

 try {
  // Insert product data
  const query = await pool.query(`
     INSERT INTO products
       (name, description, brand, price, image, product_type)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
   [name, description, brand, price, image, product_type]
  );
  const newProduct = query.rows[0];
  // Insert specific product type data
  if (product_type === 'telescope') {
   await pool.query(`
       INSERT INTO telescopes 
         (product_id, telescope_type_id, optical_design_id)
       VALUES ($1, $2, $3)`,
    [newProduct.id, telescope_type_id, optical_design_id]
   );
  } else if (product_type === 'mount') {
   await pool.query(`
       INSERT INTO mounts
         (product_id, mount_type_id)
       VALUES ($1, $2)`,
    [newProduct.id, mount_type_id]
   );
  }
  res.status(201).json({
   message: 'Product added succesfully',
   newProduct: newProduct
  });
 } catch (error) {
  console.error('Error adding new product', error);
  res.status(500).json({ message: 'Server error', error });
 }
}

export const updateProductController = async (req, res) => {
 const { id } = req.params;
 const {
  name,
  description,
  brand,
  price,
  image,
  product_type,
  telescope_type_id,
  optical_design_id,
  mount_type_id
 } = req.body;

 try {
  // Check if products exists
  const checkProduct = await pool.query(`
     SELECT * FROM products WHERE id = $1`, [id]);
  if (checkProduct.rows.length === 0) {
   return res.status(404).json({ message: 'Product not found' });
  }
  // Update specific product
  const query = await pool.query(`
     UPDATE products SET
       name = $1,
       description = $2,
       brand = $3,
       price = $4,
       image = $5,
       product_type = $6,
       updated_at = NOW()
     WHERE id = $7
     RETURNING *`,
   [name, description, brand, price, image, product_type, id]
  );
  const updatedProduct = query.rows[0];
  // Update specific product type data
  if (product_type === 'telescope') {
   await pool.query(`
       UPDATE telescopes SET
         telescope_type_id = $1,
         optical_design_id = $2
       WHERE product_id = $3
       RETURNING *`,
    [telescope_type_id, optical_design_id, id]
   );
  } else if (product_type === 'mount') {
   await pool.query(`
       UPDATE mounts SET
         mount_type_id = $1
       WHERE product_id = $2
       RETURNING *`,
    [mount_type_id, id]
   );
  }
  res.status(200).json({
   message: 'Product updated succesfully',
   updatedProduct: updatedProduct
  });
 } catch (error) {
  console.error('Error updating product', error);
  res.status(500).json({ message: 'Server error', error });
 }
}

export const deleteProductController = async (req, res) => {
 const { id } = req.params;
 const { product_type } = req.body;

 try {
    // Check if products exists
    const checkProduct = await pool.query(`
     SELECT * FROM products WHERE id = $1`, [id]);
  if (checkProduct.rows.length === 0) {
   return res.status(404).json({ message: 'Product not found' });
  }
  // Delete specifics product types
  if (product_type === 'telescope') {
   await pool.query('DELETE FROM telescopes WHERE product_id = $1', [id])
  } else if (product_type === 'mount') {
   await pool.query('DELETE FROM mounts WHERE product_id = $1', [id])
  }
  // Delete product
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.status(200).json({ message: 'Product deleted succesfully' });
 } catch (error) {
  console.error('Error deleting product', error);
  res.status(500).json({ message: 'Server error', error });
 }
}

