import fastify from "fastify";
import { connectToDatabase } from "./db";
import { movieRoutes } from "./routes/movieRoutes";
import { homeRoutes } from "./routes/homeRoutes";

const server = fastify({ logger: true });
server.register(movieRoutes);
server.register(homeRoutes);
const start = async () => {
  try {
    await connectToDatabase();

    const address = await server.listen({ port: 3000 });
    console.log(`🚀 Server listening on ${address}`);
    
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
