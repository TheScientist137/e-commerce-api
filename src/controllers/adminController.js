import pool from "../config/db.js";
import { uploadImage, deleteImage } from "../cloudinary.js";

export const addProductController = async (req, res) => {
  const { image } = req.files;
  const {
    name,
    description,
    brand,
    price,
    product_type,
    telescope_type_id,
    optical_design_id,
    mount_type_id,
  } = req.body;
  console.log(image);

  // Validate product and spicifics fields
  if (!name || !description || !brand || !price || !image || !product_type) {
    return res
      .status(400)
      .json({ message: "Basic product fields are required" });
  }
  if (
    product_type === "telescope" &&
    (!telescope_type_id || !optical_design_id)
  ) {
    return res.status(400).json({
      message: "Telescope type and optical design are required for telescopes",
    });
  }
  if (product_type === "mount" && !mount_type_id) {
    return res.status(400).json({
      message: "Mount type is required for mounts",
    });
  }
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    // Add image to cloudinary and obtain image url and public_id
    const uploadImageResponse = await uploadImage(image.tempFilePath);
    const imageUrl = uploadImageResponse.secure_url;
    const imagePublicId = uploadImageResponse.public_id;

    // Insert product data with image url
    const query = await pool.query(
      `
     INSERT INTO products
       (name, description, brand, price, image, image_public_id, product_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
      [name, description, brand, price, imageUrl, imagePublicId, product_type],
    );
    const newProduct = query.rows[0];
    // Insert specific product type data
    if (product_type === "telescope") {
      await pool.query(
        `
       INSERT INTO telescopes
         (product_id, telescope_type_id, optical_design_id)
       VALUES ($1, $2, $3)`,
        [newProduct.id, telescope_type_id, optical_design_id],
      );
    } else if (product_type === "mount") {
      await pool.query(
        `
       INSERT INTO mounts
         (product_id, mount_type_id)
       VALUES ($1, $2)`,
        [newProduct.id, mount_type_id],
      );
    }
    res.status(201).json({
      message: "Product added succesfully",
      newProduct: newProduct,
    });
  } catch (error) {
    console.error("Error adding new product", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { image } = req.files;
  const {
    name,
    description,
    brand,
    price,
    product_type,
    telescope_type_id,
    optical_design_id,
    mount_type_id,
  } = req.body;

  try {
    // Check if products exists
    const checkProduct = await pool.query(
      `
     SELECT * FROM products WHERE id = $1`,
      [id],
    );
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    // console.log(checkProduct.rows[0].image_public_id);

    // Update image on Cloudinary
    const uploadImageResponse = await uploadImage(image.tempFilePath);

    const imageUrl = uploadImageResponse.secure_url;
    const newImagePublicId = uploadImageResponse.public_id;
    await deleteImage(checkProduct.rows[0].image_public_id);

    // Update specific product
    const query = await pool.query(
      `
     UPDATE products SET
       name = $1,
       description = $2,
       brand = $3,
       price = $4,
       image = $5,
       image_public_id = $6,
       product_type = $7,
       updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
      [
        name,
        description,
        brand,
        price,
        imageUrl,
        newImagePublicId,
        product_type,
        id,
      ],
    );
    // Update specific product type data
    if (product_type === "telescope") {
      await pool.query(
        `
       UPDATE telescopes SET
         telescope_type_id = $1,
         optical_design_id = $2
       WHERE product_id = $3
       RETURNING *`,
        [telescope_type_id, optical_design_id, id],
      );
    } else if (product_type === "mount") {
      await pool.query(
        `
        UPDATE mounts SET
         mount_type_id = $1
       WHERE product_id = $2
       RETURNING *`,
        [mount_type_id, id],
      );
    }

    res.status(200).json({
      message: "Product updated succesfully",
      updatedProduct: query.rows[0],
    });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const { product_type, image_public_id } = req.body;

  try {
    // Check if products exists
    const checkProduct = await pool.query(
      `
     SELECT * FROM products WHERE id = $1`,
      [id],
    );
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Delete specifics product types
    if (product_type === "telescope") {
      await pool.query("DELETE FROM telescopes WHERE product_id = $1", [id]);
    } else if (product_type === "mount") {
      await pool.query("DELETE FROM mounts WHERE product_id = $1", [id]);
    }
    // Delete image from cloudinary
    if (image_public_id) {
      await deleteImage(image_public_id);
    }
    // Delete product
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ message: "Product deleted succesfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ message: "Server error", error });
  }
};
