import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

//Adding Product to favourite list
export const addFavourite = async (req, res) => {
  try {
    const { productid, userid } = req.headers;
    const product = await Product.findById(productid);
    const user = await User.findById(userid);

    //if Product or User is not exist or found
    if (!product) {
      return res.status(404).json({ message: "Product is not found!" });
    }
    if (!user) {
      return res.status(404).json({ message: "User is not found!" });
    }

    //If Product is already in favourite list
    const isProductFavourite = await user.favourite.includes(productid);
    if (isProductFavourite) {
      return res
        .status(409)
        .json({ message: "Product is already in favourite list!" });
    }

    //Updating favourite list in user model and adding new product in favourite list
    const favProduct = await user.updateOne({
      $push: { favourite: productid },
    });

    //If product is not added in favourite list for some reason
    if (favProduct.modifiedCount == 0) {
      return res
        .status(403)
        .json({ message: "Product is not added to favourite list" });
    }

    //Product is added to favorite list
    return res
      .status(200)
      .json({ message: "Product added to favourite list!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Remove Product from favourite list of user
export const removeFavourite = async (req, res) => {
  try {
    const { userid, productid } = req.headers;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check Product is in favourite list or not
    const isProductFavourite = await user.favourite.includes(productid);
    if (!isProductFavourite) {
      return res
        .status(404)
        .json({ message: "Product is not found in favourite list!" });
    }

    //Removed from favourite list
    const removeFav = await user.updateOne({
      $pull: { favourite: productid },
    });

    //If Not removed from favourite list
    if (removeFav.modifiedCount == 0) {
      return res
        .status(403)
        .json({ message: "Product is not removed from favourite list!" });
    }

    return res
      .status(200)
      .json({ message: "Product is removed from favourite list!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Getting All favourite product from favourite list
export const getAllFavourite = async (req, res) => {
  try {
    const { userid } = req.headers;

    //get all value from user expect password
    const user = await User.findById(userid).select("-password");

    //If user is not found
    if (!user) {
      return res.status(404).json({ message: "User is not found!" });
    }

    //Populate favourite from user model
    const allFav = await user.populate("favourite");

    return res
      .status(200)
      .json({ message: "Getting All Product from favourite list!", allFav });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Remove all favourite product from favourite list
export const removeAllFavourite = async (req, res) => {
  try {
    const { userid } = req.headers;
    const user = await User.findById(userid);
    //If User is not found
    if (!user) {
      return res.status(404).json({ message: "User is not found!" });
    }

    //Set favourite is empty
    const removeAllFav = await User.findByIdAndUpdate(userid, {
      $set: { favourite: [] },
    });

    return res
      .status(200)
      .json({ message: "Favourite list is clear successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Intenal server error!" });
  }
};
