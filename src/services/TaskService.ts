import { Task } from "@prisma/client";
import { TCategory, TCreateTask, TTask, TUpdateTask } from "../interfaces";
import { prisma } from "../database/prisma";
import { injectable } from "tsyringe";
import { TReturnCreatedTask, TReturnTask } from "../interfaces/tasks.interfaces";
import { returnTaskSchema } from "../schemas/tasks.schema";


@injectable()
export class TaskService {
    create = async (payload: TCreateTask): Promise<TReturnCreatedTask> => {
        const newTask = await prisma.task.create({ data: payload });

        return newTask
    };

    readAll = async (category?: string | undefined): Promise<Array<TReturnTask>> => {
        
        if (category) {
            return await prisma.task.findMany({ 
                where: { category: { name: { contains: category, mode: "insensitive"}} },
                include: {category: true}
                })
        } 
        const allTasks = await prisma.task.findMany({include: {category: true}});
        
        return returnTaskSchema.array().parse(allTasks)

    };

    readOne = async (taskId: number): Promise<TReturnTask | null> => {
        const task = await prisma.task.findFirst({where: {id: taskId}, include: {category: true}});

        return returnTaskSchema.parse(task)
    };

    update = async (taskId: number, payload: TUpdateTask): Promise<Task | null> => {
        return await prisma.task.update({where: {id: taskId}, data: payload})
    };

    delete = async (taskId: number): Promise<void> => {
        await prisma.task.delete({where: { id: taskId }})
    }
}