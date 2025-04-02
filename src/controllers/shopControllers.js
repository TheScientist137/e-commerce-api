import pool from "../config/db.js";

// SELECT telescopes 
export const showTelescopesController = async (req, res) => {
  try {
    const telescopesQuery = await pool.query(`
        SELECT 
          telescopes.id,
          telescopes.name,
          telescopes.description,
          telescopes.price,
          telescopes.brand,
          telescopes.image,
          telescope_types.type AS telescope_type,
          telescope_types.description AS telescope_type_description,
          optical_designs.type AS optical_design_type,
          optical_designs.description AS optical_design_description
        FROM products
        JOIN telescopes ON products.id = telescope.product_id
        JOIN telescope_types ON telescopes.telescope_type_id = telescope_types.id
        JOIN optical_designs ON telescopes.optical_design_id = optical_designs.id
        WHERE products.product_type = 'telescope'
    `);

    res.status(200).json({ 
      message: "Telescopes retrieved succesfully", 
      telescopes: telescopesQuery.rows });
  } catch (error) {
    console.error("Error retrieving telescopes", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// SELECT mounts
export const showMountsController = async (req, res) => {
  try {
    const mountsQuery = await pool.query(`
        SELECT 
          mounts.id,
          mounts.name,
          mounts.description,
          mounts.price,
          mounts.brand,
          mounts.image,
          mount_types.type AS mount_type,
          mount_types.description AS mount_type_description
        FROM products
        JOIN mounts ON products.id = mounts.product_id
        JOIN mount_types ON mounts.mount_type_id = mount_types.id
        WHERE products.product_type = 'mount'
    `);

    res.status(200).json({ 
      message: "Mounts retrieved succesfully", 
      mounts: mountsQuery.rows });
  } catch (error) {
    console.error("Erorr retrieving mounts", error);
    res.status(500).json({ message: 'Server error' });
  }
};

