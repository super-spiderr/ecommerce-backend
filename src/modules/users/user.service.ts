import { createAppError } from "../../common/errors/AppError";
import { IUser, User } from "./user.model";

export const createUser = async (data: Partial<IUser>) => {
  const existing = await User.findOne({ firebaseUid: data.firebaseUid });
  if (existing) throw createAppError("User Alredy exists", 400);

  const user = await User.create(data);
  return user;
};

export const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await User.find().skip(skip).limit(limit); // <- await
  const total = await User.countDocuments();

  return { users, total, page, limit };
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) throw createAppError("User not found", 404);

  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });

  if (!user) throw createAppError("User not found", 404);

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isActive: false });

  if (!user) throw createAppError("User not found", 404);

  return user;
};
