import express from "express";

const router = express.Router();
import {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/shop/order.controllers.js";


router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/user/:userId", getAllOrdersByUser);
router.get("/:id", getOrderDetails);

export default router;