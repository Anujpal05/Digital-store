import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "admin", "salesman"],
    },
    verify: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3237/3237472.png",
    },
    favourite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);

export default User;
