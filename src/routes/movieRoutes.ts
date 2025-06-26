import { FastifyInstance } from "fastify";
import { Movie } from "../models/Movie";

export async function movieRoutes(app: FastifyInstance) {
  // Get all movies (limit to avoid overload)
  app.get("/movies", async (request, reply) => {
    const movies = await Movie.find().limit(2); // change limit as needed
    return movies;
  });
}
