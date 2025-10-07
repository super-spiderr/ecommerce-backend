import { FastifyInstance } from "fastify";
import { createUser, getUsers } from "../controllers/userController";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/users", getUsers);
  app.post("/users", createUser);
}
