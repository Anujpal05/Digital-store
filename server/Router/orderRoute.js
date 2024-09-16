import express from "express";
import {
  getAllOrders,
  getOrder,
  getUserOrders,
  placedOrder,
  placeOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../Controller/orderController.js";
import { authenticationToken } from "../Auth/auth.js";
const router = express.Router();

router.route("/placed-order").post(authenticationToken, placedOrder);
router.route("/placed-orders").post(authenticationToken, placeOrders);
router.route("/get-all-orders").get(authenticationToken, getAllOrders);
router.route("/get-order").get(authenticationToken, getOrder);
router.route("/update-orderstatus").put(authenticationToken, updateOrderStatus);
router
  .route("/update-paymentstatus")
  .put(authenticationToken, updatePaymentStatus);
router.route("/get-user-order").get(authenticationToken, getUserOrders);
export default router;
