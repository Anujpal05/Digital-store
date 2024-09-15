import express from "express";
import {
  addCart,
  getAllCart,
  removeCart,
} from "../Controller/cartController.js";
import { authenticationToken } from "../Auth/auth.js";

const router = express.Router();

router.route("/add-cart").post(authenticationToken, addCart);
router.route("/remove-cart").put(authenticationToken, removeCart);
router.route("/get-all-cart").get(authenticationToken, getAllCart);

export default router;
