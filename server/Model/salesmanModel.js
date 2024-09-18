import mongoose from "mongoose";

const salesmanSchema = new mongoose.Schema(
  {
    salesmanId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
    orderId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

const Salesman = new mongoose.model("salesman", salesmanSchema);
export default Salesman;
