import express from "express";
import {
  addCart,
  getAllCart,
  removeCart,
} from "../Controller/cartController.js";

const router = express.Router();

router.route("/add-cart").post(addCart);
router.route("/remove-cart").put(removeCart);
router.route("/get-all-cart").get(getAllCart);

export default router;
