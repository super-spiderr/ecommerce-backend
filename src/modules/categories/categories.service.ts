import { createAppError } from "../../common/errors/AppError";
import { Category, ICategory } from "./category.model";

export const createCategory = async (data: Partial<ICategory>) => {
  const existing = await Category.findOne({ name: data.name });

  if (existing) throw createAppError("Category already exists", 400);

  const category = await Category.create(data);
  return category;
};

export const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) throw createAppError("Category not found", 404);

  return category;
};

export const getCategories = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Category.countDocuments({ isActive: true });

  const categories = await Category.find({ isActive: true })
    .skip(skip)
    .limit(limit);

  return { categories, total, page, limit };
};

export const updateCategory = async (id: string, data: Partial<ICategory>) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  if (!category) throw createAppError("Category not found", 404);

  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndUpdate(id, { isActive: false });

  if (!category) throw createAppError("Category not found", 404);

  return category;
};
