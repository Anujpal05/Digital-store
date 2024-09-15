import express from "express";
import {
  getAllUser,
  getUser,
  loginController,
  registerController,
  updateUser,
} from "../Controller/userController.js";
import { authenticationToken } from "../Auth/auth.js";

const router = express.Router();
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/update-user").put(authenticationToken, updateUser);
router.route("/get-all-user").get(authenticationToken, getAllUser);
router.route("/get-user").get(authenticationToken, getUser);
export default router;
