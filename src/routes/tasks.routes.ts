import { Router } from "express";
import { EnsureMiddleware } from "../middlewares";
import { TaskControllers } from "../controllers/tasks.controllers";
import { container } from "tsyringe";
import { TaskService } from "../services/TaskService";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema";

export const tasksRouter = Router();

container.registerSingleton("TaskService", TaskService);
const taskController = container.resolve(TaskControllers);

const ensure = new EnsureMiddleware();

tasksRouter.post("/", ensure.validateBody(createTaskSchema),ensure.onCreateTaskCategoryIdExist, (req, res) => taskController.create(req, res));

tasksRouter.get("/", (req, res) => taskController.readAll(req, res));

tasksRouter.use("/:id", ensure.idExist)

tasksRouter.get("/:id", (req, res) => taskController.readOne(req, res));

tasksRouter.patch("/:id", ensure.validateBody(updateTaskSchema), ensure.onUpdateTaskCategoryIdExist, (req, res) => taskController.update(req, res));

tasksRouter.delete("/:id", (req, res) => taskController.delete(req, res));