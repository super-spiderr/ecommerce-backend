import { FastifyInstance } from "fastify";
import * as UserController from "./user.controller";
import { adminGuard } from "../../middlewares/adminGuard";
import { authGuard } from "../../middlewares/authGuard";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", UserController.createUserHandler);

  fastify.get(
    "/users",
    { preHandler: [authGuard, adminGuard] },
    UserController.getUserHandler
  );

  fastify.get("/users/:id", UserController.getUserByIdHandler);

  fastify.patch("/users/:id", UserController.updateUserHandler);

  fastify.delete("/users/:id", UserController.deleteUserHandler);
}
