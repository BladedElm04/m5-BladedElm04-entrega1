import { Router } from "express";
import { container } from "tsyringe";
import { CategoriesService } from "../services/CategoriesService";
import { CategoriesController } from "../controllers/categories.controllers";
import { EnsureMiddleware } from "../middlewares";
import { createCategorySchema } from "../schemas/categories.schema";

export const categoriesRouter = Router();

container.registerSingleton("CategoriesService", CategoriesService);
const categoriesControllers = container.resolve(CategoriesController);

const ensure = new EnsureMiddleware();

categoriesRouter.post("/", ensure.validateBody(createCategorySchema),(req, res)=> categoriesControllers.create(req, res));

categoriesRouter.delete("/:id", ensure.categoryIdExist, (req, res) => categoriesControllers.delete(req, res));