import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
  userIdParamsSchema,
} from "./user.schema";
import { createAppError } from "../../common/errors/AppError";

import * as UserService from "./user.service";
import { sendResponse } from "../../common/utils/response";

export const createUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success)
    throw createAppError(parsed.error.issues[0].message, 400);

  const user = await UserService.createUser(parsed.data);

  sendResponse(reply, user, "User created successfully");
};

export const getUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = getUsersQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const { page, limit } = parsed.data;

  const { users, total } = await UserService.getAllUsers(page, limit);
  sendResponse(reply, users, "Users fetched successfully", {
    meta: { total, page, limit },
  });
};

export const getUserByIdHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = userIdParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const user = await UserService.getUserById(parsed.data.id);
  sendResponse(reply, user, "User fetched successfully");
};

export const updateUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsParsed = userIdParamsSchema.safeParse(req.params);
  if (!paramsParsed.success) {
    throw createAppError(paramsParsed.error.issues[0].message, 400);
  }

  const bodyParsed = updateUserSchema.safeParse(req.body);
  if (!bodyParsed.success) {
    throw createAppError(bodyParsed.error.issues[0].message, 400);
  }

  const user = await UserService.updateUser(
    paramsParsed.data.id,
    bodyParsed.data
  );
  sendResponse(reply, user, "User updated successfully");
};

export const deleteUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = userIdParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const user = await UserService.deleteUser(parsed.data.id);
  sendResponse(reply, user, "User deleted successfully");
};
