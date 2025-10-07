import Fastify from "fastify";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

const app = Fastify();

const start = async () => {
  try {
    await connectDB();
    app.get("/", () => {
      return { message: "Hello Styrotype" };
    });
    await app.register(userRoutes, { prefix: "/api" });
    await app.register(productRoutes, { prefix: "/api" });
    const host = process.env.HOST || "0.0.0.0";
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // 👈 single definition

    await app.listen({ port, host });
    console.log(`🚀 Server running at http://${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
