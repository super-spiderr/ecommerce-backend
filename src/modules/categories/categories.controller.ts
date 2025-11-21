import { FastifyReply, FastifyRequest } from "fastify";
import * as CategoryService from "./categories.service";
import { sendResponse } from "../../common/utils/response";

export const createCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const category = await CategoryService.createCategory(req.body as any);
  sendResponse(reply, category, "Category created successfully");
};

export const getCategoriesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { page = 1, limit = 10 } = req.query as any;
  const { categories, total } = await CategoryService.getCategories(
    Number(page),
    Number(limit)
  );
  sendResponse(reply, categories, "Categoeries fetched successfully", {
    meta: { total, page, limit },
  });
};

export const getCategoryByIdHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as any;
  const category = await CategoryService.getCategoryById(id);
  sendResponse(reply, category, "Catgeory fetched successfully");
};

export const updateCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as any;
  const category = await CategoryService.updateCategory(id, req.body as any);
  sendResponse(reply, category, "Catgeory updated successfully");
};

export const deleteCategoryHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as any;
  const category = await CategoryService.deleteCategory(id);
  sendResponse(reply, category, "Catgeory deleted successfully");
};
