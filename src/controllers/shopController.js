import pool from "../config/db.js";

export const getProductsController = async (req, res) => {
  try {
    const query = await pool.query(`
      SELECT * 
      FROM products
      ORDER BY products.created_at DESC
    `);
    if (query.rows.length === 0) {
      throw new Error('Products not found');
    }
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

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (query.rows.length === 0) {
      throw new Error('Product not found');
    }
    res.status(200).json({
      message: 'Product obtained succesfully',
      product: query.rows[0]
    });
  } catch (error) {
    console.error('Error obtaining product', error);
    res.status(404).json({ message: 'Server error' })
  }
}

export const getTelescopesController = async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT 
     products.id,
     products.product_type AS product_type,
     products.name,
     products.description,
     products.price,
     products.brand,
     products.image,
     telescope_types.type AS telescope_type,
     telescope_types.description AS telescope_type_description,
     optical_designs.type AS optical_design_type,
     optical_designs.description AS optical_design_description
    FROM products
    JOIN telescopes ON products.id = telescopes.product_id
    JOIN telescope_types ON telescopes.telescope_type_id = telescope_types.id
    JOIN optical_designs ON telescopes.optical_design_id = optical_designs.id
    WHERE products.product_type = 'telescope'
    ORDER BY products.created_at DESC`
    );
    if (query.rows.length === 0) {
      throw new Error('Telescopes not found');
    }

    res.status(200).json({
      message: "Telescopes retrieved succesfully",
      count: query.rowCount,
      telescopes: query.rows
    });
  } catch (error) {
    console.error("Error retrieving telescopes", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMountsController = async (req, res) => {
  try {
    const query = await pool.query(`
      SELECT 
        products.id,
        products.product_type AS product_type,
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
      ORDER BY products.created_at DESC
    `);
    if (query.rows.length === 0) {
      throw new Error('Mounts not found');
    }
    res.status(200).json({
      message: "Mounts retrieved succesfully",
      count: query.rowCount,
      mounts: query.rows
    });
  } catch (error) {
    console.error("Erorr retrieving mounts", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

