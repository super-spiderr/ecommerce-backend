import { User } from "../users/user.model";
import {
  createAccessToken,
  createRefreshToken,
} from "../../plugins/jwt.plugin";
import admin from "../../config/firebase";

export const loginWithFirebase = async (idToken: string) => {
  const decoded = await admin.auth().verifyIdToken(idToken);
  console.log(decoded);
  const firebaseUid = decoded.uid;
  const name = decoded.name || decoded.email?.split("@")[0] || "User";
  const [firstName, ...lastNameParts] = name.split(" ");
  const lastName = lastNameParts.join(" ");
  let user = await User.findOne({ firebaseUid });

  if (user) {
    user.lastLoginAt = new Date();
    await user.save();
  } else {
    user = await User.create({
      firebaseUid,
      email: decoded.email,
      emailVerified: decoded.email_verified,
      firstName: firstName || "User",
      lastName: lastName || "",
      phone: decoded.phone_number || "",
      lastLoginAt: new Date(),
      authProvider: decoded.firebase.sign_in_provider,
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
