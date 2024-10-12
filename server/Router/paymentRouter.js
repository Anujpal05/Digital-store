import express from "express";
import { checkout } from "../Controller/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

export default router;
