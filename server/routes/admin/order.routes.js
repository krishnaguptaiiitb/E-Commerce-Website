import express from "express";
const router = express.Router();

import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
} from "../../controllers/admin/order.controllers.js";

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);

export default router;
