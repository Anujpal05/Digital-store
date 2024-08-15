import express from "express";
import dotenv from "dotenv";
import connectWithDB from "./database/db.js";
import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

//Connected with database
connectWithDB();

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
