import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppErrors } from "../errors/appErrors";
import { IRequestSchema } from "../interfaces/request.interfaces";
import { AnyZodObject, string } from "zod";
import jwt from "jsonwebtoken";

export class EnsureMiddleware {
    idExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const taskId = req.params.id;
        const foundTask = await prisma.task.findFirst({where: {id: Number(taskId)}});

        if(!foundTask){
            throw new AppErrors("Task not found", 404);
        };

        res.locals.task = foundTask.id;

        return next();
    };

    validateBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        
        req.body = schema.parse(req.body);
        
        return next();
    };

    onCreateTaskCategoryIdExist = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {

        const categoryId = req.body.categoryId;

        if(!categoryId){
            return next();
        }

        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}});

        if(!foundCategory){
            throw new AppErrors("Category not found", 404);
        }

        return next();

    };

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

    };

    categoryIdExist = async (req: Request, res: Response, next: NextFunction):Promise<Response |void> => {

        const categoryId = req.params.id;
        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}});

        if(!foundCategory){
            throw new AppErrors("Category not found", 404);
        }

        res.locals.categoryId = foundCategory.id;

        return next();
    };

    validadeToken = (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if(!authorization){
            throw new AppErrors("Token is required", 401);
        }

        const token = authorization?.replace("Bearer ", "")

        
        if(!token){
            throw new AppErrors("Token is required", 401);
        }

        const secret = process.env.JWT_SECRET!;
        
        jwt.verify(token, secret)

        res.locals.decode = jwt.decode(token);

        next()
        
    };

    verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        const email = req.body.email

        const foundEmail = await prisma.user.findFirst({where: {email}});

        if(foundEmail){
            throw new AppErrors("This email is already registered", 409);
        }

        return next();
    };

    verifyUserTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const userId = res.locals.decode.id;

        const taskId = Number(req.params.id);

        const task = await prisma.task.findFirst({where: {id: taskId}});

        if(task?.userId !== userId){
            throw new AppErrors("This user is not the task owner", 403)
        }

        next();
    };

    verifyUserCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const userId = res.locals.decode.id;

        const categoryId = Number(req.params.id);

        const category = await prisma.category.findFirst({where: {id: categoryId}});

        if(category?.userId !== userId){
            throw new AppErrors("This user is not the category owner", 403)
        }

        next();
    }
}