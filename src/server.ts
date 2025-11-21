import { buildApp } from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./plugins/db.plugin";

async function start() {
  await connectDB();

  const app = await buildApp();

  try {
    await app.listen({
      port: Number(ENV.PORT),
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on port ${ENV.PORT}`);
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
}

start();
