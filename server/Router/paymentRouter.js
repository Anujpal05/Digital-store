import express from "express";
import { checkout, checkoutCart } from "../Controller/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/checkout-cart").post(checkoutCart);

export default router;
