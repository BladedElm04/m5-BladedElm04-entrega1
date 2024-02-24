import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    userId: z.number().positive()
});

export const createCategorySchema = categorySchema.omit({id: true, userId: true});