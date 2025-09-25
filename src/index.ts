import Fastify from 'fastify'
import connectDB from './db';
import userRoutes from './routes/userRoutes';

const app = Fastify();

const start = async () => {
  try {
    await connectDB();
    await app.register(userRoutes);
    await app.listen({ port: 3000 })
    console.log('🚀 Server running at http://localhost:3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start();
