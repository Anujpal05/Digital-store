import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out of delivery", "Delivered", "Cancelled"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Unpaid",
      enum: ["Paid", "Unpaid", "Failed"],
      required: true,
    },
    paymentMode: {
      type: String,
      default: "COD",
      enum: ["COD", "Online"],
      required: true,
    },
  },
  { timestamps: true }
);

const Order = new mongoose.model("order", orderSchema);

export default Order;
