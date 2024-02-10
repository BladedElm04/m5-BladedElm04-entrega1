import { createTaskSchema, returnTaskSchema, taskSchema, updateTaskSchema } from "../schemas/tasks.schema";
import { z } from "zod";

type TTask = z.infer<typeof taskSchema>;

type TCreateTask = z.infer<typeof createTaskSchema>;

type TUpdateTask = z.infer<typeof updateTaskSchema>;

type TReturnTask = z.infer<typeof returnTaskSchema>

export { TTask, TCreateTask, TUpdateTask, TReturnTask };