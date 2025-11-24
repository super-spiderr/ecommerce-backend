import Fastify from "fastify";
import { rootRoute } from "./plugins/root.plugin";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.routes";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.register(rootRoute);
  app.register(authRoutes, { prefix: "/api" });
  app.register(userRoutes, { prefix: "/api" });
  app.register(categoriesRoutes, { prefix: "/api" });

  return app;
}
