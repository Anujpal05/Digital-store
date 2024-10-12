import express from "express";
import {
  checkout,
  getSession,
  handleWebHook,
  verifyPaymentStatus,
} from "../Controller/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/verify").post(verifyPaymentStatus);
router.route("/session/:sessionId").get(getSession);

export default router;
