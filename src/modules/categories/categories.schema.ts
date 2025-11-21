import { z } from "zod";

// ----------------------
// Request Body Schemas
// ----------------------
// Create Category
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

// Update Category
export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

// ----------------------
// Params Schemas
// ----------------------

// Params for /categories/:id
export const categoryIdParamsSchema = z.object({
  id: z.string().min(1, "Category ID is required"),
});

// ----------------------
// Query Schemas
// ----------------------

// Pagination: /categories?page=1&limit=10
export const getCategoriesQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .optional()
    .transform((val) => Number(val) || 1),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .optional()
    .transform((val) => Number(val) || 10),
});
