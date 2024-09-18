import express from "express";
import {
  addProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
  getSalesmanProducts,
} from "../Controller/productController.js";
import { authenticationToken } from "../Auth/auth.js";
const router = express.Router();

router.route("/addproduct").post(authenticationToken, addProduct);
router.route("/getallproduct").get(getAllProduct);
router.route("/getproduct").get(getProduct);
router.route("/updateproduct").put(authenticationToken, updateProduct);
router.route("/deleteProduct").delete(authenticationToken, deleteProduct);
router.route("/product-category-wise").get(getProductByCategory);
router
  .route("/get-salesman-products")
  .get(authenticationToken, getSalesmanProducts);

export default router;
