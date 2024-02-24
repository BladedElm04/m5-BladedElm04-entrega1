import { Router } from "express";
import { EnsureMiddleware } from "../middlewares";
import { container } from "tsyringe";
import { UserService } from "../services/UserServices";
import { UserControllers } from "../controllers/user.controllers";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

export const userRouter = Router();

container.registerSingleton("UserService", UserService);
const userController = container.resolve(UserControllers);

const ensure = new EnsureMiddleware();

userRouter.post("/", ensure.validateBody(createUserSchema), ensure.verifyEmail, (req, res) => userController.create(req, res));

userRouter.post("/login", ensure.validateBody(loginUserSchema), (req, res) => userController.login(req, res));

userRouter.get("/profile", ensure.validadeToken, (req, res) => userController.autologin(req, res));