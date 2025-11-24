import { FastifyReply, FastifyRequest } from "fastify";
import * as CategoryService from "./categories.service";
import { sendResponse } from "../../common/utils/response";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoriesQuerySchema,
  categoryIdParamsSchema,
} from "./categories.schema";
import { createAppError } from "../../common/errors/AppError";

export const createCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const category = await CategoryService.createCategory(parsed.data);

  sendResponse(reply, category, "Category created successfully");
};

export const getCategoriesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = getCategoriesQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const { page, limit } = parsed.data;

  const { categories, total } = await CategoryService.getCategories(
    page,
    limit
  );
  sendResponse(reply, categories, "Categories fetched successfully", {
    meta: { total, page, limit },
  });
};

export const getCategoryByIdHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = categoryIdParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const category = await CategoryService.getCategoryById(parsed.data.id);
  sendResponse(reply, category, "Category fetched successfully");
};

export const updateCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsParsed = categoryIdParamsSchema.safeParse(req.params);
  if (!paramsParsed.success) {
    throw createAppError(paramsParsed.error.issues[0].message, 400);
  }

  const bodyParsed = updateCategorySchema.safeParse(req.body);
  if (!bodyParsed.success) {
    throw createAppError(bodyParsed.error.issues[0].message, 400);
  }

  const category = await CategoryService.updateCategory(
    paramsParsed.data.id,
    bodyParsed.data
  );
  sendResponse(reply, category, "Category updated successfully");
};

export const deleteCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const parsed = categoryIdParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw createAppError(parsed.error.issues[0].message, 400);
  }

  const category = await CategoryService.deleteCategory(parsed.data.id);
  sendResponse(reply, category, "Category deleted successfully");
};
