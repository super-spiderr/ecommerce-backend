import { FastifyReply } from "fastify";

interface SendResponseOptions {
  meta?: Record<string, any>;
}

export const sendResponse = <T>(
  reply: FastifyReply,
  data: T | null,
  message = "Success",
  options?: SendResponseOptions
) => {
  const response: any = {
    status: "success",
    message,
    data,
  };
  if (options?.meta) {
    response.meta = options.meta;
  }
  return reply.send(response);
};
