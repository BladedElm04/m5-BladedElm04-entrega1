import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { inject, injectable } from "tsyringe";

@injectable()
export class TaskControllers {
    constructor(@inject("TaskService") private taskService: TaskService) {}

    create = async (req: Request, res: Response): Promise<Response> => {

        const id = res.locals.decode.id;

        const newTask = await this.taskService.create(Number(id), req.body);

        return res.status(201).json(newTask); 
    };

    readAll = async ( req: Request, res: Response): Promise<Response> => {
        const id = res.locals.decode.id;

        const taskList = await this.taskService.readAll(id, req.query.category as string);

        return res.status(200).json(taskList);
    };

    readOne = async (_: Request, res: Response): Promise<Response> => {

        const id = res.locals.decode.id;

        const task = await this.taskService.readOne(id, res.locals.task)
        
        return res.status(200).json(task);
    };

    update = async (req: Request, res: Response): Promise<Response> => {

        const id = res.locals.decode.id;
        
        const taskId = Number(req.params.id);

        const updatedTask = await this.taskService.update(id, taskId, req.body);

        return res.status(200).json(updatedTask);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {

        const id = res.locals.decode.id;

        await this.taskService.delete(id ,Number(req.params.id));

        return res.status(204).json();
    }

}