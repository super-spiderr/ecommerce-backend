import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../plugins/jwt.plugin";
import { User } from "../modules/users/user.model";

export const authGuard = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return reply
        .status(401)
        .send({ message: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const payload: any = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);

    const user = await User.findById(payload.userId);
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    req.user = user;
  } catch (err: any) {
    req.log.error(err);

    return reply.status(401).send({
      status: "error",
      message: err.message || "Unauthorized",
    });
  }
};
