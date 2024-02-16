import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppErrors } from "../errors/appErrors";
import { IRequestSchema } from "../interfaces/request.interfaces";
import { AnyZodObject } from "zod";

export class EnsureMiddleware {
    idExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const taskId = req.params.id;
        const foundTask = await prisma.task.findFirst({where: {id: Number(taskId)}});

        if(!foundTask){
            throw new AppErrors("Task not found", 404);
        };

        res.locals.task = foundTask.id;

        return next();
    }

    validateBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        
        req.body = schema.parse(req.body);
        
        return next();
    }

    onCreateTaskCategoryIdExist = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {

        const categoryId = req.body.categoryId;

        if(!categoryId){
            return next();
        }

        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}});

        if(!foundCategory){
            throw new AppErrors("Category not found", 403);
        }

        return next();

    }

    onUpdateTaskCategoryIdExist = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {

        const categoryId = req.body.categoryId;

        if(!categoryId){
            return next();
        }

        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}});

        if(!foundCategory){
            throw new AppErrors("Category not found", 404);
        }

        return next();

    }

    categoryIdExist = async (req: Request, res: Response, next: NextFunction):Promise<Response |void> => {

        const categoryId = req.params.id;
        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}});

        if(!foundCategory){
            throw new AppErrors("Category not found", 404);
        }

        res.locals.categoryId = foundCategory.id;

        return next();
    }
}