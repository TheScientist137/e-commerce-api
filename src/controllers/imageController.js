import pool from "../config/db.js";
import { uploadImage } from "../cloudinary.js";

 const uploadImageController = async (req, res) => {
    const {image} = req.files;
    const {id} = req.params;
    try {
        const result = await uploadImage(image.data);
        const query = await pool.query(`
            UPDATE products SET image = $1 WHERE id = $2 RETURNING *`,
            [result.secure_url, id]);
        console.log(query.rows[0]);
        res.status(200).json({
            message: 'Image uploaded successfully',
            result: query.rows[0]
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({error: 'Server error'});
    }
}

export default uploadImageController;