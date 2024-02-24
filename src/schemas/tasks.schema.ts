import { z } from "zod";
import { categorySchema } from "./categories.schema";
import { userSchema } from "./user.schema";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number().positive().nullish(),
    category: categorySchema.nullish(),
    userId: z.number().positive(),
});

export const createTaskSchema = taskSchema.omit({id: true, finished: true, category: true, userId: true, user: true});

export const updateTaskSchema = taskSchema.omit({id: true, category: true, userId: true}).partial();

export const returnTaskSchema = taskSchema.omit({categoryId: true});

export const returnCreatedTaskSchema = taskSchema.omit({category: true});

