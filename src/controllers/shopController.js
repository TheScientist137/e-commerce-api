import pool from "../config/db.js";

// Get products controllers
export const getProductsController = async (req, res) => {
  try {
    const query = await pool.query(`
      SELECT * 
      FROM products
      ORDER BY products.created_at DESC
    `);
    if (query.rows.length === 0) {
      throw new Error("Products not found");
    }
    res.status(200).json({
      message: "Products retrieved succesfully",
      count: query.rowCount,
      products: query.rows,
    });
  } catch (error) {
    console.error("Error retrieving products", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTelescopesController = async (req, res) => {
  try {
    // JOIN product_filters dos veces con alias diferentes
    const query = await pool.query(`
      SELECT 
        products.*, 
        optical_filter.name AS optical_design_name,
        optical_filter.image_url AS optical_design_image,
        mount_filter.name AS mount_type_name,
        mount_filter.image_url AS mount_type_image,
        product_brands.name AS brand_name,
        product_brands.image_url AS brand_image
      FROM products
      JOIN telescopes ON telescopes.product_id = products.id
      JOIN telescope_specs ON telescope_specs.telescope_id = telescopes.id
      LEFT JOIN product_filters AS optical_filter ON telescope_specs.product_filter_id = optical_filter.id
      LEFT JOIN product_filters AS mount_filter ON telescope_specs.mount_filter_id = mount_filter.id
      LEFT JOIN product_brands ON products.brand_id = product_brands.id
      WHERE products.product_type = 'telescope'
      ORDER BY products.created_at DESC
    `);

    if (query.rows.length === 0) {
      throw new Error("Telescopes not found");
    }

    res.status(200).json({
      message: "Telescopes retrieved succesfully",
      count: query.rowCount,
      telescopes: query.rows,
    });
  } catch (error) {
    console.error("Error retrieving telescopes", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMountsController = async (req, res) => {
  try {
    // JOIN product_filters dos veces con alias diferentes
    const query = await pool.query(`
      SELECT 
        products.*, 
        product_filters.name AS build_type_name,
        product_filters.image_url AS build_type_image,
        product_brands.name AS brand_name,
        product_brands.image_url AS brand_image
      FROM products
      JOIN mounts ON mounts.product_id = products.id
      JOIN mount_specs ON mount_specs.mount_id = mounts.id
      LEFT JOIN product_filters ON mount_specs.product_filter_id = product_filters.id
      LEFT JOIN product_brands ON products.brand_id = product_brands.id
      WHERE products.product_type = 'mount'
      ORDER BY products.created_at DESC
    `);

    if (query.rows.length === 0) {
      throw new Error("Mounts not found");
    }

    res.status(200).json({
      message: "Mounts retrieved succesfully",
      count: query.rowCount,
      mounts: query.rows,
    });
  } catch (error) {
    console.error("Error retrieving mounts", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEyepiecesController = async (req, res) => {
  try {
    // JOIN product_filters dos veces con alias diferentes
    const query = await pool.query(`
      SELECT 
        products.*, 
        product_filters.name AS build_type_name,
        product_filters.image_url AS build_type_image,
        product_brands.name AS brand_name,
        product_brands.image_url AS brand_image
      FROM products
      JOIN eyepieces ON eyepieces.product_id = products.id
      JOIN eyepieces_specs ON eyepieces_specs.eyepiece_id = eyepieces.id
      LEFT JOIN product_filters ON eyepieces_specs.product_filter_id = product_filters.id
      LEFT JOIN product_brands ON products.brand_id = product_brands.id
      WHERE products.product_type = 'eyepiece'
      ORDER BY products.created_at DESC
    `);

    if (query.rows.length === 0) {
      throw new Error("Eyepieces not found");
    }

    res.status(200).json({
      message: "Eyepieces retrieved succesfully",
      count: query.rowCount,
      eyepieces: query.rows,
    });
  } catch (error) {
    console.error("Error retrieving eyepieces", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFiltersController = async (req, res) => {
  try {
    const query = await pool.query(`
      SELECT 
        products.*, 
        product_filters.name AS build_type_name,
        product_filters.image_url AS build_type_image,
        product_brands.name AS brand_name,
        product_brands.image_url AS brand_image
      FROM products
      JOIN filters ON filters.product_id = products.id
      JOIN filter_specs ON filter_specs.filter_id = filters.id
      LEFT JOIN product_filters ON filter_specs.product_filter_id = product_filters.id
      LEFT JOIN product_brands ON products.brand_id = product_brands.id
      WHERE products.product_type = 'filter'
      ORDER BY products.created_at DESC
    `);

    if (query.rows.length === 0) {
      throw new Error("Filters not found");
    }

    res.status(200).json({
      message: "Filters retrieved succesfully",
      count: query.rowCount,
      filters: query.rows,
    });
  } catch (error) {
    console.error("Error retrieving filters", error);
    res.status(500).json({ message: "Server error" });
  }
};

// MODIFICAR TODOS LOS CONTROLADORES QUE OBTIENEN PRODUCTOS POR ID

export const getTelescopeByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtain base product
    const productQuery = await pool.query(
      `
      SELECT 
        products.*, 
        optical_filter.name AS optical_design_name,
        optical_filter.image_url AS optical_design_image,
        mount_filter.name AS mount_type_name,
        mount_filter.image_url AS mount_type_image,
        product_brands.name AS brand_name,
        product_brands.image_url AS brand_image
      FROM products
      JOIN telescopes ON telescopes.product_id = products.id
      JOIN telescope_specs ON telescope_specs.telescope_id = telescopes.id
      LEFT JOIN product_filters AS optical_filter ON telescope_specs.product_filter_id = optical_filter.id
      LEFT JOIN product_filters AS mount_filter ON telescope_specs.mount_filter_id = mount_filter.id
      LEFT JOIN product_brands ON products.brand_id = product_brands.id
      WHERE products.id = $1 AND products.product_type = 'telescope'
      LIMIT 1
    `,
      [id]
    );
    if (productQuery.rows.length === 0) {
      return res.status(404).json({ message: "Telescope product not found" });
    }
    let selectedProduct = { ...productQuery.rows[0] };

    // Obtain telescope id
    const telescopeQuery = await pool.query(
      "SELECT id FROM telescopes WHERE product_id = $1",
      [id]
    );
    if (telescopeQuery.rows.length === 0) {
      return res.status(404).json({ message: "Telescope not found" });
    }
    const telescopeId = telescopeQuery.rows[0].id;
    // Obtener specific details of selected telescope
    const telescopeDetailsQuery = await pool.query(
      "SELECT * FROM telescope_specs WHERE telescope_id = $1",
      [telescopeId]
    );
    if (telescopeDetailsQuery.rows.length === 0) {
      return res.status(404).json({ message: "Telescope details not found" });
    }

    // Combine product and telescope details
    selectedProduct = {
      ...selectedProduct,
      specifications: {
        ...telescopeDetailsQuery.rows[0],
      },
    };

    res.status(200).json({
      message: "Telescope obtained successfully",
      product: selectedProduct,
    });
  } catch (error) {
    console.error("Error retrieving telescope", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMountByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtain base product
    const productQuery = await pool.query(
      `
    SELECT 
      products.*, 
      product_filters.name AS build_type_name,
      product_filters.image_url AS build_type_image,
      product_brands.name AS brand_name,
      product_brands.image_url AS brand_image
    FROM products
    JOIN mounts ON mounts.product_id = products.id
    JOIN mount_specs ON mount_specs.mount_id = mounts.id
    LEFT JOIN product_filters ON mount_specs.product_filter_id = product_filters.id
    LEFT JOIN product_brands ON products.brand_id = product_brands.id
    WHERE products.id = $1 AND products.product_type = 'mount'
    LIMIT 1
  `,
      [id]
    );
    if (productQuery.rows.length === 0) {
      return res.status(404).json({ message: "Mount product not found" });
    }
    let selectedProduct = { ...productQuery.rows[0] };

    // Obtain mount id
    const mountQuery = await pool.query(
      "SELECT id FROM mounts WHERE product_id = $1",
      [id]
    );
    if (mountQuery.rows.length === 0) {
      return res.status(404).json({ message: "Mount not found" });
    }
    const mountId = mountQuery.rows[0].id;

    // Obtener specific details of selected mount
    const mountDetailsQuery = await pool.query(
      "SELECT * FROM mount_specs WHERE mount_id = $1",
      [mountId]
    );
    if (mountDetailsQuery.rows.length === 0) {
      return res.status(404).json({ message: "Mount details not found" });
    }

    // Combine product and mount details
    selectedProduct = {
      ...selectedProduct,
      specifications: {
        ...mountDetailsQuery.rows[0],
      },
    };

    res.status(200).json({
      message: "Mount obtained successfully",
      product: selectedProduct,
    });
  } catch (error) {
    console.error("Error retrieving mount", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEyepieceByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtain base product
    const productQuery = await pool.query(
      `
    SELECT 
      products.*, 
      product_filters.name AS build_type_name,
      product_filters.image_url AS build_type_image,
      product_brands.name AS brand_name,
      product_brands.image_url AS brand_image
    FROM products
    JOIN eyepieces ON eyepieces.product_id = products.id
    JOIN eyepieces_specs ON eyepieces_specs.eyepiece_id = eyepieces.id
    LEFT JOIN product_filters ON eyepieces_specs.product_filter_id = product_filters.id
    LEFT JOIN product_brands ON products.brand_id = product_brands.id
    WHERE products.id = $1 AND products.product_type = 'eyepiece'
    LIMIT 1
  `,
      [id]
    );
    if (productQuery.rows.length === 0) {
      return res.status(404).json({ message: "Eyepiece product not found" });
    }
    let selectedProduct = { ...productQuery.rows[0] };

    // Obtain eyepiece id
    const eyepieceQuery = await pool.query(
      "SELECT id FROM eyepieces WHERE product_id = $1",
      [id]
    );
    if (eyepieceQuery.rows.length === 0) {
      return res.status(404).json({ message: "Eyepiece not found" });
    }
    const eyepieceId = eyepieceQuery.rows[0].id;

    // Obtener specific details of selected eyepiece
    const eyepieceDetailsQuery = await pool.query(
      "SELECT * FROM eyepieces_specs WHERE eyepiece_id = $1",
      [eyepieceId]
    );
    if (eyepieceDetailsQuery.rows.length === 0) {
      return res.status(404).json({ message: "Eyepiece details not found" });
    }

    // Combine product and eyepiece details
    selectedProduct = {
      ...selectedProduct,
      specifications: {
        ...eyepieceDetailsQuery.rows[0],
      },
    };

    res.status(200).json({
      message: "Eyepiece obtained successfully",
      product: selectedProduct,
    });
  } catch (error) {
    console.error("Error retrieving eyepiece", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFilterByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtain base product
    const productQuery = await pool.query(
      `
    SELECT 
      products.*, 
      product_filters.name AS build_type_name,
      product_filters.image_url AS build_type_image,
      product_brands.name AS brand_name,
      product_brands.image_url AS brand_image
    FROM products
    JOIN filters ON filters.product_id = products.id
    JOIN filter_specs ON filter_specs.filter_id = filters.id
    LEFT JOIN product_filters ON filter_specs.product_filter_id = product_filters.id
    LEFT JOIN product_brands ON products.brand_id = product_brands.id
    WHERE products.id = $1 AND products.product_type = 'filter'
    LIMIT 1
  `,
      [id]
    );
    if (productQuery.rows.length === 0) {
      return res.status(404).json({ message: "Filter product not found" });
    }
    let selectedProduct = { ...productQuery.rows[0] };

    // Obtain filter id
    const filterQuery = await pool.query(
      "SELECT id FROM filters WHERE product_id = $1",
      [id]
    );
    if (filterQuery.rows.length === 0) {
      return res.status(404).json({ message: "Filter not found" });
    }
    const filterId = filterQuery.rows[0].id;

    // Obtener specific details of selected filter
    const filterDetailsQuery = await pool.query(
      "SELECT * FROM filter_specs WHERE filter_id = $1",
      [filterId]
    );
    if (filterDetailsQuery.rows.length === 0) {
      return res.status(404).json({ message: "Filter details not found" });
    }

    // Combine product and filter details
    selectedProduct = {
      ...selectedProduct,
      specifications: {
        ...filterDetailsQuery.rows[0],
      },
    };

    res.status(200).json({
      message: "Filter obtained successfully",
      product: selectedProduct,
    });
  } catch (error) {
    console.error("Error retrieving filter", error);
    res.status(500).json({ message: "Server error" });
  }
};

// OBTAIN ALL PRODUCTS FILTERS AND BRANDS
export const getProductsFiltersController = async (req, res) => {
  const query = await pool.query("SELECT * FROM product_filters");

  if (query.rows.length === 0) {
    throw new Error("Product filters not found");
  }

  res.status(200).json({
    message: "Filters retrieved succesfully",
    count: query.rowCount,
    productFilters: query.rows,
  });
};

export const getProductsBrandsController = async (req, res) => {
  const query = await pool.query("SELECT * FROM product_brands");

  if (query.rows.length === 0) {
    throw new Error("Products brands not found");
  }

  res.status(200).json({
    message: "Brands retrieved succesfully",
    count: query.rowCount,
    productBrands: query.rows,
  });
};
