import { model, Schema } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  emailVerified: boolean;

  firstName: string;
  lastName: string;
  photoUrl: string;
  authProvider: string;
  isProfileComplete: boolean;
  phone?: string;
  phoneVerified: boolean;

  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  role: "customer" | "admin" | "seller";
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true, default: "" },
    phone: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    authProvider: { type: String, default: "email" },
    isProfileComplete: { type: Boolean, default: false },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      default: "prefer_not_to_say",
    },
    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    lastLoginAt: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
