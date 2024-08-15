import express from "express";
import {
  addProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../Controller/productController.js";
const router = express.Router();

router.route("/addproduct").post(addProduct);
router.route("/getallproduct").get(getAllProduct);
router.route("/getproduct").get(getProduct);
router.route("/updateproduct").put(updateProduct);
router.route("/deleteProduct").delete(deleteProduct);

export default router;
