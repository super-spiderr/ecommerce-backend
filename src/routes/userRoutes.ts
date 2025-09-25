import { FastifyInstance } from 'fastify';
import { getUsers} from '../controllers/userController';

export default async function userRoutes(app: FastifyInstance) {
   app.get('/', ()=>{return {message: 'Hello World'}});
  app.get('/users', getUsers);
}
