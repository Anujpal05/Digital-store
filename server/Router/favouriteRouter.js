import express from "express";
import {
  addFavourite,
  getAllFavourite,
  removeAllFavourite,
  removeFavourite,
} from "../Controller/favouriteController.js";

const router = express.Router();

router.route("/add-favourite").put(addFavourite);
router.route("/remove-favourite").delete(removeFavourite);
router.route("/get-all-favourite").get(getAllFavourite);
router.route("/remove-all-favourite").delete(removeAllFavourite);

export default router;
