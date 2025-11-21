import { z } from "zod";

// --------------------
// Body schemas
// --------------------
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

// --------------------
// Params
// --------------------
export const categoryIdParamsSchema = z.object({
  id: z.string().min(1, "Category ID is required"),
});

// --------------------
// Query (for pagination)
// --------------------
export const getCategoriesQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});
