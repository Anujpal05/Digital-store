import { populate } from "dotenv";
import Order from "../Model/orderModel.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

//place order from cart
export const placeOrders = async (req, res) => {
  try {
    const { userid } = req.headers;
    const { paymentMode, bill, products, paymentIntentId } = req.body;
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
      paymentIntentId: paymentIntentId,
    });
    await newOrder.save();
    await user.updateOne({
      $push: { order: newOrder._id },
    });
    for (const item of products) {
      await user.updateOne({
        $pull: { cart: item.product },
      });
    }
    return res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Place Order direct
export const placedOrder = async (req, res) => {
  try {
    const { userid, productid } = req.headers;
    const { paymentMode, quantity, bill, paymentIntentId } = req.body;

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
      paymentIntentId: paymentIntentId,
    });

    await newOrder.save();
    await user.updateOne({
      $push: { order: newOrder._id },
    });
    return res
      .status(200)
      .json({ message: "Placed New Order!", orderId: newOrder._id });
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

//get order
export const getOrder = async (req, res) => {
  try {
    const { orderid } = req.headers;
    if (!orderid) {
      return res.status(404).json({ message: "Order id not found!" });
    }
    const order = await Order.findById(orderid)
      .populate("user")
      .populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    return res
      .status(200)
      .json({ message: "Order found successfully!", order });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderid } = req.headers;
    const { orderStatus, user } = req.body;
    if (user.role != "admin" && user.role != "salesman") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    await order.updateOne({
      $set: { orderStatus: orderStatus },
    });

    return res
      .status(200)
      .json({ message: "Order Status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { user } = req.body;
    if (user.role != "admin" && user.role != "salesman") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const orders = await Order.find()
      .populate("user")
      .select("-password")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found", orders });
    }
    return res
      .status(200)
      .json({ message: "All Orders get successfully!", orders });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderid } = req.headers;
    const { paymentStatus, user } = req.body;
    if (user.role != "admin" && user.role != "salesman") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    await order.updateOne({
      $set: { paymentStatus: paymentStatus },
    });

    return res
      .status(200)
      .json({ message: "Payment Status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
