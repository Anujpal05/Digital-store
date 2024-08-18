import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

export const addCart = async (req, res) => {
  try {
    const { userid, productid } = req.headers;
    const user = await User.findById(userid);
    const product = await Product.findById(productid);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const isProductInCart = await user.cart.includes(productid);
    if (isProductInCart) {
      return res.status(409).json({ message: "Product is already in cart" });
    }

    const addToCart = await user.updateOne({
      $push: { cart: productid },
    });

    if (addToCart.modifiedCount == 0) {
      return res.status(403).json({ message: "Product is not added in cart!" });
    }

    return res.status(200).json({ message: "Product is added to cart!" });
  } catch (error) {
    return res.status(500).json({ message: "Intenal server error!" });
  }
};

//Remove Product from cart list
export const removeCart = async (req, res) => {
  try {
    const { userid, productid } = req.headers;
    const user = await User.findById(userid);
    const product = await Product.findById(productid);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const isProductInCart = await user.cart.includes(productid);
    if (!isProductInCart) {
      return res.status(409).json({ message: "Product is not in cart" });
    }

    const removeFromCart = await user.updateOne({
      $pull: { cart: productid },
    });

    return res.status(200).json({ message: "Product removed from cart!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const { userid } = req.headers;
    const user = await User.findById(userid)
      .select("-password")
      .populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "Getting All Product from cart list!", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
