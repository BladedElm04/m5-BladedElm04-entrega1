import { z } from "zod";
import { taskSchema } from "./tasks.schema";
import { categorySchema } from "./categories.schema";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(4),
    tasks: taskSchema.array().nullish(),
    categories: categorySchema.array().nullish()
})

export const createUserSchema = userSchema.omit({id: true, tasks: true, categories: true});

export const loginUserSchema = createUserSchema.omit({name: true});

export const returnUserSchema = userSchema.omit({password: true});