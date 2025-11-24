import { z } from "zod";

export const createUserSchema = z.object({
  firebaseUid: z.string().min(1, "Firebase UID is required"),

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),

  email: z.string().min(1, "Invalid email"),

  phone: z.string().optional(),

  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),

  role: z.enum(["customer", "admin", "seller"]).optional(),

  isActive: z.boolean().optional(),

  photoUrl: z.string().optional(),
  authProvider: z.string().min(1, "Authprovider is required"),
});
export const updateUserSchema = z.object({
  firebaseUid: z.string().optional(),

  firstName: z.string().optional(),
  lastName: z.string().optional(),

  email: z.string().optional(),

  phone: z.string().optional(),

  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),

  role: z.enum(["customer", "admin", "seller"]).optional(),

  isActive: z.boolean().optional(),

  photoUrl: z.string().optional(),
  authProvider: z.string().optional(),
});

export const getUsersQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export const userIdParamsSchema = z.object({
  id: z.string().min(1, "Category ID is required"),
});
