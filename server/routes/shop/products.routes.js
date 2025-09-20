import express from "express";
import {
  getFilterProducts,
  getProductDetails,
} from "../../controllers/shop/products.controllers.js";

const router = express.Router();

router.get("/get", getFilterProducts);
router.get("/get/:productId", getProductDetails);

export default router;
