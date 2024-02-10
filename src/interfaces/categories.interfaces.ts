import { z } from "zod";
import { categorySchema, createCategorySchema } from "../schemas/categories.schema";

type TCategory = z.infer<typeof categorySchema>;

type TCreateCategory = z.infer<typeof createCategorySchema>;

export { TCategory, TCreateCategory };