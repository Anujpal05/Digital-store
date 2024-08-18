import express from "express";
import {
  getAllUser,
  loginController,
  registerController,
  updateUser,
} from "../Controller/userController.js";

const router = express.Router();
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/update-user").put(updateUser);
router.route("/get-all-user").get(getAllUser);

export default router;
