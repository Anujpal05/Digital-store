import express from "express";
import {
  getUserOrders,
  placedOrder,
  placeOrders,
  updateOrderStatus,
} from "../Controller/orderController.js";
const router = express.Router();

router.route("/placed-order").post(placedOrder);
router.route("/placed-orders").post(placeOrders);
router.route("/update-orderstatus").put(updateOrderStatus);
router.route("/get-user-order").get(getUserOrders);
export default router;
