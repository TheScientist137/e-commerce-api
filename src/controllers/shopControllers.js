import pool from "../config/db.js";

const showTelescopesController = async (req, res) => {
  try {
    const telescopesQuery = await pool.query(`
        SELECT telescopes.*, telescope_types.type AS telescope_type
        FROM telescopes
        INNER JOIN telescope_types ON telescopes.telescope_type_id = telescope_types.id
    `);
    const telescopes = telescopesQuery.rows;

    res
      .status(200)
      .json({ message: "Telescopes retrieved succesfully", telescopes });
  } catch (error) {
    console.error("Error retrieving telescopes", error);
    res
      .status(500)
      .json({ message: "Error retrieving telescopes", error: error.message });
  }
};

// show mounts controller
const showMountsController = async (req, res) => {
  try {
    const mountsQuery = await pool.query(`
        SELECT mounts.*, mount_types.type AS mount_type
        FROM mounts
        INNER JOINT mount_types ON mounts.mount_type_id = mount_types.id
    `);
    const mounts = mountsQuery.rows;

    res.status(200).json({ message: "Mounts retrieved succesfully", mounts });
  } catch (error) {
    console.error("Erorr retrieving mounts");
    res.status(500);
  }
};

export default {
  showTelescopesController,
  showMountsController,
};
