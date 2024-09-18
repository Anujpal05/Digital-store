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
      enum: [
        "general",
        "phones",
        "clothes",
        "books",
        "toys",
        "electronics gadgets",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    supplierId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("product", productSchema);

export default Product;
