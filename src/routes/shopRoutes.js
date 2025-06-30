import express from "express";
import {
  getProductsController,
  getTelescopesController,
  getMountsController,
  getEyepiecesController,
  getFiltersController,
  getProductsFiltersController,
  getTelescopeByIdController,
  getMountByIdController,
  getEyepieceByIdController,
  getFilterByIdController,
} from "../controllers/shopController.js";

const router = express.Router();

router.get("/products", getProductsController);
router.get("/telescopes", getTelescopesController);
router.get("/mounts", getMountsController);
router.get("/eyepieces", getEyepiecesController);
router.get("/filters", getFiltersController);

router.get("/productFilters", getProductsFiltersController);

router.get("/telescopes/:id", getTelescopeByIdController);
router.get("/mounts/:id", getMountByIdController);
router.get("/eyepieces/:id", getEyepieceByIdController);
router.get("/filters/:id", getFilterByIdController);

export default router;
