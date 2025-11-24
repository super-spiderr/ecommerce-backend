import { buildApp } from "./app";
import { connectDB } from "./plugins/db.plugin";
import { ENV } from "./config/env";

async function start() {
  await connectDB();
  const app = await buildApp();

  await app.listen({
    port: Number(ENV.PORT),
    host: "0.0.0.0",
  });

  console.log(`🚀 Server running on port ${ENV.PORT}`);
}

start();
