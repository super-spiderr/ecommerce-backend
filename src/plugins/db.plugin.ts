import mongoose from "mongoose";
import { ENV } from "../config/env";

export async function connectDB() {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
}
