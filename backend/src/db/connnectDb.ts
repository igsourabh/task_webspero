import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);
export const connectDB: any = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://sourabhsaffron07:grHYRvCP5mWjOnaX@cluster0.qrz2s32.mongodb.net/websperotask?retryWrites=true&w=majority"
  );
  console.log(`mongo db connected ${conn.connection.host}`);
};
