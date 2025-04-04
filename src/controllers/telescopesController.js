import pool from "../config/db.js";
import {
  createBaseProductController,
  updateBaseProductController,
  deleteBaseProductController
} from './productsController.js';

// SELECT telescopes 
export const showTelescopesController = async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT 
     products.id,
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

// INSERT telescope
export const addTelescopeController = async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    telescope_type_id,
    optical_design_id, image } = req.body;
  try {
    // Create new product
    const baseProduct = await createBaseProductController({
      name, description, price, brand, image, product_type: 'telescope'
    });
    const query = await pool.query(
      `INSERT INTO telescopes (product_id, telescope_type_id, optical_design_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [baseProduct.id, telescope_type_id, optical_design_id]
    );
    console.log(query);
    res.status(201).json({
      message: 'Telescope added succesfully',
      newProduct: { ...baseProduct, ...query.rows[0] }
    });
  } catch (error) {
    console.error('Error adding new telescope', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// UPDATE telescope
export const updateTelescopeController = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    brand,
    telescope_type_id,
    optical_design_id, image } = req.body;
  try {
    // Update telescope base product
    await updateBaseProductController(id, {
      name, description, price, brand, image
    })
    // Update specific telescope fields
    await pool.query(`
      UPDATE telescopes SET 
        telescope_type_id = $1,
        optical_design_id = $2 
      WHERE product_id = $3 
      RETURNING *`,
      [telescope_type_id, optical_design_id, id]
    );
    // Get updated telescope
    const query = await pool.query(
      `SELECT 
        products.*,
        telescopes.telescope_type_id,
        telescopes.optical_design_id
       FROM products
       JOIN telescopes ON products.id = telescopes.product_id
       WHERE products.id = $1`,
      [id]
    );
    res.status(200).json({
      message: 'Telescope updated succesfully',
      updatedTelescope: query.rows[0]
    });
  } catch (error) {
    console.error('Error updating telescope', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE telescope
export const deleteTelescopeController = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM telescopes WHERE product_id = $1', [id]);
    await deleteBaseProductController(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting telescope', error);
    res.status(500).json({ message: 'Server error' });
  }
}
