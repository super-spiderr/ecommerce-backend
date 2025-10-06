import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, lowercase: true, sparse: true },
    phone: { type: String, sparse: true },
    authProvider: {
      type: String,
      enum: ["email", "google", "phone"],
      required: true,
    },
    isProfileComplete: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    photoURL: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
