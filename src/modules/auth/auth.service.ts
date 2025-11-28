import { User } from "../users/user.model";
import {
  createAccessToken,
  createRefreshToken,
} from "../../plugins/jwt.plugin";
import admin from "../../config/firebase";

export const loginWithFirebase = async (idToken: string) => {
  const decoded = await admin.auth().verifyIdToken(idToken);
  const firebaseUid = decoded.uid;

  let user = await User.findOne({ firebaseUid });

  if (user) {
    user.lastLoginAt = new Date();
    await user.save();
  } else {
    user = await User.create({
      firebaseUid,
      email: decoded.email,
      emailVerified: decoded.email_verified,
      firstName: decoded.name || "",
      lastName: "",
      phone: decoded.phone_number || "",
      lastLoginAt: new Date(),
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({ userId: user._id });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
