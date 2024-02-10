import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { inject, injectable } from "tsyringe";
import { prisma } from "../database/prisma";

@injectable()
export class TaskControllers {
    constructor(@inject("TaskService") private taskService: TaskService) {}

    create = async (req: Request, res: Response): Promise<Response> => {
        const newTask = await this.taskService.create(req.body);

        return res.status(201).json(newTask); 
    };

    readAll = async ( req: Request, res: Response): Promise<Response> => {
        const taskList = await this.taskService.readAll(req.query.category as string);

        return res.status(200).json(taskList);
    };

    readOne = async (_: Request, res: Response): Promise<Response> => {
        const task = await this.taskService.readOne(res.locals.task)
        return res.status(200).json(task);
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const taskId = Number(req.params.id);
        const updatedTask = await this.taskService.update(taskId, req.body);

        return res.status(200).json(updatedTask);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        await this.taskService.delete(Number(req.params.id));

        return res.status(204).json();
    }

}