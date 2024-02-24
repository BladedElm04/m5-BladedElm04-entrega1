import { Task } from "@prisma/client";
import { TCategory, TCreateTask, TTask, TUpdateTask } from "../interfaces";
import { prisma } from "../database/prisma";
import { injectable } from "tsyringe";
import { TReturnCreatedTask, TReturnTask } from "../interfaces/tasks.interfaces";
import { returnTaskSchema } from "../schemas/tasks.schema";


@injectable()
export class TaskService {
    create = async (userId: number , payload: TCreateTask): Promise<TReturnCreatedTask> => {
        
        const newTask = {...payload, userId}
        
        const Task = await prisma.task.create({ data: newTask });

        return Task
    };

    readAll = async (userId: number,category?: string | undefined): Promise<Array<TReturnTask>> => {
        
        if (category) {
            return await prisma.task.findMany({ 
                where: { category: { name: { contains: category, mode: "insensitive"}} },
                include: {category: true}
                })
        } 
        const allTasks = await prisma.task.findMany({ where:{ userId },include: {category: true}});
        
        return returnTaskSchema.array().parse(allTasks)

    };

    readOne = async (userId: number,taskId: number): Promise<TReturnTask | null> => {
        const task = await prisma.task.findFirst({where: {userId , id: taskId}, include: {category: true}});

        return returnTaskSchema.parse(task)
    };

    update = async (userId: number ,taskId: number, payload: TUpdateTask): Promise<Task | null> => {
        return await prisma.task.update({where: { userId, id: taskId }, data: payload})
    };

    delete = async (userId:number, taskId: number): Promise<void> => {
        await prisma.task.delete({where: { userId, id: taskId }})
    }
}