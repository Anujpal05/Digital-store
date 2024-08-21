import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general",
      enum: ["general", "phones", "clothes", "books", "toys"],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("product", productSchema);

export default Product;
