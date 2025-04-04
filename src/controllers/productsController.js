import pool from "../config/db.js";

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.status(200).json({
      message: 'Product obtained succesfully',
      product: query.rows[0]
    });
  } catch (error) {
    console.error('Error obtaining product', error);
    res.status(404).json({ message: 'Server error' })
  }
}

// Crear show products controller 
export const getProductsController = async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT * 
       FROM products
       ORDER BY products.created_at DESC`
    );
    res.status(200).json({
      message: 'Products retrieved succesfully',
      count: query.rowCount,
      products: query.rows
    });
  } catch (error) {
    console.error('Error retrieving products', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const createBaseProductController = async (productData) => {
  const { name, description, price, brand, image, product_type } = productData;
  try {
    const query = await pool.query(
      `INSERT INTO products (name, description, price, brand, image, product_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, brand, image, product_type]
    );
    if (query.rows.length === 0) throw new Error('Product not found');
    return query.rows[0];
  } catch (error) {
    console.error('Error creating base product', error);
  }
}

export const updateBaseProductController = async (id, productData) => {
  const { name, description, price, brand, image } = productData;
  try {
    const query = await pool.query(
      `UPDATE products SET
        name = $1,
        description = $2,
        price = $3,
        brand = $4,
        image = $5
       WHERE id = $6
       RETURNING *`,
      [name, description, price, brand, image, id]
    );
    if (query.rows.length === 0) throw new Error('Product not found');
    return query.rows[0];
  } catch (error) {
    console.error('Error updating product');
  }
}

export const deleteBaseProductController = async (id) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting base product', error);
  }
}