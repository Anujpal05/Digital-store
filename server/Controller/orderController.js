import { populate } from "dotenv";
import Order from "../Model/orderModel.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

export const placeOrders = async (req, res) => {
  try {
    const { userid } = req.headers;
    const { paymentMode, bill, products } = req.body;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!products) {
      return res.status(404).json({ message: "Products not found!" });
    }

    const newOrder = new Order({
      user: userid,
      products: products,
      paymentMode: paymentMode,
      other: { bill },
    });
    await newOrder.save();
    await user.updateOne({
      $push: { order: newOrder._id },
    });
    return res.status(200).json({ message: "Order successfully!", newOrder });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Place Order
export const placedOrder = async (req, res) => {
  try {
    const { userid, productid } = req.headers;
    const { paymentMode, quantity, bill } = req.body;

    const user = await User.findById(userid);
    const product = await Product.findById(productid);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const newOrder = new Order({
      user: userid,
      products: [{ product: productid, others: { quantity } }],
      paymentMode: paymentMode,
      other: { bill },
    });
    console.log(newOrder);
    await newOrder.save();
    await user.updateOne({
      $push: { order: newOrder._id },
    });
    return res.status(200).json({ message: "Placed New Order!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const { userid } = req.headers;
    const user = await User.findById(userid).populate({
      path: "order",
      populate: { path: "products", populate: { path: "product" } },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "Getting user's all order", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderid } = req.headers;
    const { orderStatus } = req.body;
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    await order.updateOne({
      $set: { orderStatus: orderStatus },
    });

    return res.status(200).json({ message: "Order is updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
