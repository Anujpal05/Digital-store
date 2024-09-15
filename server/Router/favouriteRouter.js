import express from "express";
import {
  addFavourite,
  getAllFavourite,
  removeAllFavourite,
  removeFavourite,
} from "../Controller/favouriteController.js";
import { authenticationToken } from "../Auth/auth.js";

const router = express.Router();

router.route("/add-favourite").put(authenticationToken, addFavourite);
router.route("/remove-favourite").delete(authenticationToken, removeFavourite);
router.route("/get-all-favourite").get(authenticationToken, getAllFavourite);
router
  .route("/remove-all-favourite")
  .delete(authenticationToken, removeAllFavourite);

export default router;
