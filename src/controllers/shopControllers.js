import pool from "../config/db.js";

const showTelescopesController = async (req, res) => {
 try {
  const telescopesQuery = await pool.query(`
   SELECT telescopes.*, telescope_types.type AS telescope_type
   FROM telescopes
   INNER JOIN telescope_types ON telescopes.telescopetypeid = telescope_types.id
  `);
  const telescopes = telescopesQuery.rows;

  res.status(200).json({ message: 'Telescopes retrieved succesfully', telescopes });
 } catch (error) {
  console.error('Error retrieving telescopes', error);
  res.status(500).json({ message: 'Error retrieving telescopes', error: error.message });
 }
}

export default {
 showTelescopesController,
};