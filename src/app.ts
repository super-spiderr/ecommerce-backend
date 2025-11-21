import Fastify from "fastify";
import { rootRoute } from "./plugins/root.plugin";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.register(rootRoute);

  return app;
}
