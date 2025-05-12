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
    // Obtain base products => telescopes
    const baseTelescopesQuery = await pool.query(`
      SELECT *
      FROM products
      WHERE products.product_type = 'telescope'
      ORDER BY products.created_at DESC
    `);
    const baseTelescopes = baseTelescopesQuery.rows;
    //Obtain telescopes specific info
    const productsId = baseTelescopes.map((product) => product.id);
    const telescopesInfoQuery = await pool.query(
      `
      SELECT *
      FROM telescopes
      WHERE product_id = ANY($1)
    `,
      [productsId]
    );
    const telescopesInfo = telescopesInfoQuery.rows;
    // Combine telescopes data
    const telescopes = baseTelescopes.map((telescope) => {
      const telescopeData = telescopesInfo.find(
        (info) => info.product_id === telescope.id
      );
      return { ...telescope, telescopeData };
    });

    res.status(200).json({
      message: "Telescopes retrieved succesfully",
      count: telescopes.length,
      telescopes: telescopes,
    });
  } catch (error) {
    console.error("Error retrieving telescopes", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMountsController = async (req, res) => {
  try {
    // Obtain base products => mounts
    const baseMountsQuery = await pool.query(`
      SELECT *
      FROM products
      WHERE products.product_type = 'mount'
      ORDER BY products.created_at DESC
    `);
    const baseMounts = baseMountsQuery.rows;
    //Obtain mounts specific info
    const productsId = baseMounts.map((product) => product.id);
    const mountsInfoQuery = await pool.query(
      `
      SELECT *
      FROM mounts
      WHERE product_id = ANY($1)
    `,
      [productsId]
    );
    const mountsInfo = mountsInfoQuery.rows;
    // Combine mounts data
    const mounts = baseMounts.map((mount) => {
      const mountData = mountsInfo.find((info) => info.product_id === mount.id);
      return { ...mount, mountData };
    });
    res.status(200).json({
      message: "Mounts retrieved succesfully",
      count: mounts.length,
      mounts: mounts,
    });
  } catch (error) {
    console.error("Erorr retrieving mounts", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getEyepiecesController = async (req, res) => {
  // Obtain base products => eyepieces
  const baseEyepiecesQuery = await pool.query(`
    SELECT *
    FROM products
    WHERE products.product_type = 'eyepiece'
    ORDER BY products.created_at DESC
  `);
  const baseEyepieces = baseEyepiecesQuery.rows;
  //Obtain eyepieces specific info
  const productsId = baseEyepieces.map((product) => product.id);
  const eyepiecesInfoQuery = await pool.query(
    `
    SELECT *
    FROM eyepieces
    WHERE product_id = ANY($1)
  `,
    [productsId]
  );
  // Combine eyepieces data
  const eyepieces = baseEyepieces.map((eyepiece) => {
    const eyepieceData = eyepiecesInfoQuery.rows.find(
      (info) => info.product_id === eyepiece.id
    );
    return { ...eyepiece, eyepieceData };
  });

  res.status(200).json({
    message: "Eyepieces retrieved succesfully",
    count: eyepieces.length,
    eyepieces: eyepieces,
  });
};

export const getFiltersController = async (req, res) => {
  // Obtain base products => filters
  const baseFiltersQuery = await pool.query(`
      SELECT *
      FROM products
      WHERE products.product_type = 'filter'
      ORDER BY products.created_at DESC
    `);
  const baseFilters = baseFiltersQuery.rows;
  //Obtain filters specific info
  const productsId = baseFilters.map((product) => product.id);
  const filtersInfoQuery = await pool.query(
    `
      SELECT *
      FROM filters
      WHERE product_id = ANY($1)
    `,
    [productsId]
  );
  // Combine filters data
  const filters = baseFilters.map((filter) => {
    const filterData = filtersInfoQuery.rows.find(
      (info) => info.product_id === filter.id
    );
    return { ...filter, filterData };
  });

  res.status(200).json({
    message: "Filters retrieved succesfully",
    count: filters.length,
    filters: filters,
  });
};

// Get products by id controllers
export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtain selected base product
    const query = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (query.rows.length === 0) {
      throw new Error("Product not found");
    }
    let selectedProduct = { ...query.rows[0] };

    // Obtain specific details of selected product
    // Depending on product type
    if (selectedProduct.product_type === "telescope") {
      const telescopeQuery = await pool.query(
        "SELECT id FROM telescopes WHERE product_id = $1",
        [id]
      );

      if (telescopeQuery.rows.length === 0) {
        return res.status(404).json({ message: "Telescope not found" });
      }

      const telescopeId = telescopeQuery.rows[0].id;

      const telescopeDetailsQuery = await pool.query(
        `
        SELECT *
        FROM telescope_specs
        WHERE telescope_id = $1`,
        [telescopeId]
      );
      if (telescopeDetailsQuery.rows.length === 0) {
        throw new Error("Telescope details not found");
      }
      selectedProduct = {
        ...selectedProduct,
        specifications: {
          ...telescopeDetailsQuery.rows[0],
        },
      };
    }
    if (selectedProduct.product_type === "mount") {
      const mountQuery = await pool.query(
        "SELECT id FROM mounts WHERE product_id = $1",
        [id]
      );

      if (mountQuery.rows.length === 0) {
        return res.status(404).json({ message: "Mount not found" });
      }

      const mountId = mountQuery.rows[0].id;

      const mountDetailsQuery = await pool.query(
        `
        SELECT *
        FROM mount_specs
        WHERE mount_id = $1`,
        [mountId]
      );
      if (mountDetailsQuery.rows.length === 0) {
        throw new Error("Mount details not found");
      }
      selectedProduct = {
        ...selectedProduct,
        specifications: {
          ...mountDetailsQuery.rows[0],
        },
      };
    }

    res.status(200).json({
      message: "Product obtained succesfully",
      product: selectedProduct,
    });
  } catch (error) {
    console.error("Error retrieving product", error);
    res.status(404).json({ message: "Server error" });
  }
};

export const getTelescopeByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtain base product
    const productQuery = await pool.query(
      "SELECT * FROM products WHERE id = $1 AND product_type = 'telescope'",
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
      "SELECT * FROM products WHERE id = $1 AND product_type = 'mount'",
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
      "SELECT * FROM products WHERE id = $1 AND product_type = 'eyepiece'",
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
      "SELECT * FROM products WHERE id = $1 AND product_type = 'filter'",
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
