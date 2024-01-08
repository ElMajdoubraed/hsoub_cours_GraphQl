import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default dbConnect;
