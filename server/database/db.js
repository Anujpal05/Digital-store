import mongoose from "mongoose";

const connectWithDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb is connected successfully!"))
    .catch(() => console.log("Mongodb Connection failed"));
};

export default connectWithDB;
