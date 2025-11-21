import Fastify from "fastify";
import { rootRoute } from "./plugins/root.plugin";
import { CategoriesRoutes } from "./modules/categories/categories.route";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.register(rootRoute);
  app.register(CategoriesRoutes, { prefix: "/api" });

  return app;
}
