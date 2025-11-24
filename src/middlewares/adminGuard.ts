import { FastifyRequest, FastifyReply } from "fastify";

export const adminGuard = async (req: FastifyRequest, reply: FastifyReply) => {
  if (!req.user) {
    return reply.status(401).send({
      status: "error",
      message: "Unauthorized: No user found",
    });
  }

  if (req.user.role !== "admin") {
    return reply.status(403).send({
      status: "error",
      message: "Forbidden: Admin access required",
    });
  }
};
