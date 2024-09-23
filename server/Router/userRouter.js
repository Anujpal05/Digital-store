import express from "express";
import {
  getAllSalesman,
  getAllUser,
  getSalesmanRequest,
  getUser,
  loginController,
  registerController,
  updateProfile,
  updateUser,
  updateVerification,
} from "../Controller/userController.js";
import { authenticationToken } from "../Auth/auth.js";
import upload from "../multer/multer.js";

const router = express.Router();
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/update-user").put(authenticationToken, updateUser);
router.route("/get-all-users").get(authenticationToken, getAllUser);
router.route("/get-user").get(authenticationToken, getUser);
router.route("/get-all-salesman").get(authenticationToken, getAllSalesman);
router
  .route("/get-salesman-request")
  .get(authenticationToken, getSalesmanRequest);
router
  .route("/update-verification")
  .put(authenticationToken, updateVerification);
router
  .route("/update-profile")
  .put(authenticationToken, upload.single("image"), updateProfile);
export default router;
