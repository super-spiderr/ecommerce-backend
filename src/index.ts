import Fastify from 'fastify';
import connectDB from './db';
import userRoutes from './routes/userRoutes';

const app = Fastify();

const start = async () => {
  try {
    await connectDB();
    await app.register(userRoutes);

    const host = process.env.HOST || '0.0.0.0';
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // 👈 single definition

    await app.listen({ port, host });
    console.log(`🚀 Server running at http://${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
