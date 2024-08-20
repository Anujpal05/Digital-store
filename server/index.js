import express from "express";
import dotenv from "dotenv";
import connectWithDB from "./database/db.js";
import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
import favouriteRouter from "./Router/favouriteRouter.js";
import cartRouter from "./Router/cartRouter.js";
import orderRouter from "./Router/orderRoute.js";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

//Connected with database
connectWithDB();

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/favourite", favouriteRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
