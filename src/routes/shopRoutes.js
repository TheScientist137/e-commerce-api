import express from "express";
import {
  getProductsController,
  getTelescopesController,
  getMountsController,
  getEyepiecesController,
  getFiltersController,
  getProductByIdController,
  getTelescopeByIdController,
  getMountByIdController,
  getEyepieceByIdController,
  getFilterByIdController
} from "../controllers/shopController.js";

const router = express.Router();

router.get("/products", getProductsController);
router.get("/telescopes", getTelescopesController);
router.get("/mounts", getMountsController);
router.get("/eyepieces", getEyepiecesController);
router.get("/filters", getFiltersController);
router.get('/telescopes/:id', getTelescopeByIdController);
router.get('/mounts/:id', getMountByIdController);
router.get("/eyepieces/:id", getEyepieceByIdController);
router.get('/filters/:id', getFilterByIdController);
router.get("/products/:id", getProductByIdController);

export default router;
