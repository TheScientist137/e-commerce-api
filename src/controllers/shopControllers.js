import pool from "../scripts/db.js";

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

const showTelescopeByIdController = async (req, res) => {
 const { id } = req.params;

 try {
  const telescopeQuery = await pool.query(`
   SELECT telescopes.*, telescope_types AS telescope_type
   FROM telescopes
   INNER JOIN telescope_types ON telescopes.telescopetypeid = telescope_types.id
   WHERE telescopes.id = $1
  `, [id]);
  const telescope = telescopeQuery.rows[0];
  
  if (!telescope)
   return res.status(404).json({ message: 'Telescope not found' });

  res.status(200).json({ message: 'Telescope retrieved succesfully', telescope });
 } catch (error) {
  console.error('Error retrieving telescope by id', error);
  res.status(500).json({ message: 'Error retrieving telescope by id', error: error });
 }
}

export default {
 showTelescopesController,
 showTelescopeByIdController
};