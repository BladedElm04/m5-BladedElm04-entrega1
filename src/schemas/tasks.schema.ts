import { z } from "zod";
import { categorySchema } from "./categories.schema";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number().positive().nullish(),
    category: categorySchema.nullish()
});

export const createTaskSchema = taskSchema.omit({id: true, finished: true, category: true});

export const updateTaskSchema = taskSchema.omit({id: true, category: true}).partial();

export const returnTaskSchema = taskSchema.omit({categoryId: true});

export const returnCreatedTaskSchema = taskSchema.omit({category: true});

