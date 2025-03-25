import pool from "../config/db.js";

// INSERT telescope
export const addTelescopeController = async (req, res) => {
  const { name, description, price, brand, telescope_type_id, optical_design_id, image } = req.body;

  try {
    const addTelescopeQuery = await pool.query(`
      INSERT INTO telescopes (name, description, price, brand, telescope_type_id, optical_design_id, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, description, price, brand, telescope_type_id, optical_design_id, image]
    );
    const newTelescope = addTelescopeQuery.rows[0];

    res.status(201).json({ message: 'New telescope added succesfully', newTelescope });
  } catch (error) {
    console.error('Error adding new telescope', error);
    res.status(500).json({ message: 'Server error - Error adding telescope' });
  }
}

// UPDATE telescope
export const updateTelescopeController = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, brand, telescope_type_id, optical_design_id, image } = req.body;

  try {
    // image config

    const updateTelescopeQuery = await pool.query(`
      UPDATE telescopes SET 
        name = $1, 
        description = $2, 
        price = $3, 
        brand = $4, 
        telescope_type_id = $5, 
        optical_design_id = $6, 
        image = $7
      WHERE id = $8 
      RETURNING *`,
      [name, description, price, brand, telescope_type_id, optical_design_id, image, id]
    );
    const newTelescope = updateTelescopeQuery.rows[0];

    res.status(200).json({ message: 'Telescope updated succesfully', newTelescope });
  } catch (error) {
    console.error('Error updating telescope', error);
    res.status(500).json({ message: 'Server error - Error updating telescope' });
  }
}

// DELETE telescope
export const deleteTelescopeController = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM telescopes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting telescope', error);
    res.status(500).json({ message: 'Server error - Error deleting telescope' });
  }
}

// INSERT mount
export const addMountController = async (req, res) => {
  const { name, description, price, brand, mount_type_id, image } = req.body;

  try {
    const addMountQuery = await pool.query(`
      INSERT INTO mounts (name. description, price, brand, mount_type_id, image)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [name, description, price, brand, mount_type_id, image]
    );
    const newMount = addMountQuery.rows[0];
    res.status(201).json({ message: 'New mount added succesfully', newMount });

  } catch (error) {
    console.error('Error adding new mount', error);
    res.status(500).json({ message: 'Server error - Error adding mount' });
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
    await pool.query('DELETE FROM mounts WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting telescope', error);
    res.status(500).json({ message: 'Server error - Error deleting mount' });
  }
}

// DELETE user
