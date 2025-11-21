import { FastifyInstance } from "fastify";
import * as CategoryController from "./categories.controller";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamsSchema,
  getCategoriesQuerySchema,
} from "./categories.schema";

export async function categoriesRoutes(fastify: FastifyInstance) {
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
        querystring: getCategoriesQuerySchema,
      },
    },
    CategoryController.getCategoriesHandler
  );

  fastify.get(
    "/categories/:id",
    {
      schema: {
        params: categoryIdParamsSchema,
      },
    },
    CategoryController.getCategoryByIdHandler
  );

  fastify.patch(
    "/categories/:id",
    {
      schema: {
        body: updateCategorySchema,
        params: categoryIdParamsSchema,
      },
    },
    CategoryController.updateCategoryHandler
  );

  fastify.delete(
    "/categories/:id",
    {
      schema: {
        params: categoryIdParamsSchema,
      },
    },
    CategoryController.deleteCategoryHandler
  );
}
