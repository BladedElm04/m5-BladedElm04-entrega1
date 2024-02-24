import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import { tasksRouter, categoriesRouter, userRouter } from "./routes";
import { HandleErrosMiddleware } from "./middlewares/HandleErrors.middleware";

export const app = express();

app.use(json());
app.use(cors())
app.use(helmet());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);

app.use(HandleErrosMiddleware.execute);