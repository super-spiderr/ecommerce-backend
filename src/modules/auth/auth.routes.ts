import { FastifyInstance } from "fastify";
import { firebaseLoginController } from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/firebase-login", firebaseLoginController);
}
