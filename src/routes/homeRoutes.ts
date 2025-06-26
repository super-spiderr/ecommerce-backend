import { FastifyInstance } from "fastify";
export async function homeRoutes(app: FastifyInstance) {
    app.get('/', async () => {
      return 'Hello, World!';
    });
  }