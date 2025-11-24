import "fastify";
import { IUser } from "../modules/users/user.model";

declare module "fastify" {
  interface FastifyRequest {
    user: IUser;
  }
}
