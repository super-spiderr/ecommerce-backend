import { FastifyInstance } from "fastify";
import * as CategoryController from "./categories.controller";

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.post("/categories", CategoryController.createCategoryHandler);

  fastify.get("/categories", CategoryController.getCategoriesHandler);

  fastify.get("/categories/:id", CategoryController.getCategoryByIdHandler);

  fastify.patch("/categories/:id", CategoryController.updateCategoryHandler);

  fastify.delete("/categories/:id", CategoryController.deleteCategoryHandler);
}
