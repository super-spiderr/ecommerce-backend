import { FastifyInstance } from "fastify";
import * as CategoryController from "./categories.controller";
import {
  categoryIdParamsSchema,
  createCategorySchema,
  getCategoriesQuerySchema,
  updateCategorySchema,
} from "./categories.schema";

export async function CategoriesRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/categories",
    {
      schema: {
        body: createCategorySchema,
      },
    },
    CategoryController.createCategoryHandler
  );
  fastify.get(
    "/categories",
    {
      schema: {
        body: createCategorySchema,
      },
    },
    CategoryController.getCategoriesHandler
  );
  fastify.get(
    "/categories:/id",
    {
      schema: {
        body: getCategoriesQuerySchema,
      },
    },
    CategoryController.getCategoryByIdHandler
  );

  fastify.patch(
    "/categories/:id",
    {
      schema: {
        body: updateCategorySchema,
      },
    },
    CategoryController.updateCategoryHandler
  );
  fastify.delete(
    "/categories/:id",
    {
      schema: {
        body: categoryIdParamsSchema,
      },
    },
    CategoryController.deleteCategoryHandler
  );
}
