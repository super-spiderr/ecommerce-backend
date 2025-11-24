import { FastifyRequest, FastifyReply } from "fastify";
import { loginWithFirebase } from "./auth.service";

export const firebaseLoginController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { idToken } = req.body as { idToken: string };

  const result = await loginWithFirebase(idToken);

  return reply.send({
    status: "success",
    message: "Login success",
    data: result,
  });
};
