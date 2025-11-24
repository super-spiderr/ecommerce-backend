import { FastifyInstance } from "fastify";
import * as UserController from "./user.controller";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", UserController.createUserHandler);

  fastify.get("/users", UserController.getUserHandler);

  fastify.get("/users/:id", UserController.getUserByIdHandler);

  fastify.patch("/users/:id", UserController.updateUserHandler);

  fastify.delete("/users/:id", UserController.deleteUserHandler);
}
