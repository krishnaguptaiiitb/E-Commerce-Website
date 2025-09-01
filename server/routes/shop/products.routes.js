import express from "express";
import { getFilterProducts } from "../../controllers/shop/products.controller.js";

const router = express.Router();

router.get("/get", getFilterProducts);
export default router;
