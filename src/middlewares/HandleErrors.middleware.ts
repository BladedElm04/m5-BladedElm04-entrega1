import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../errors/appErrors";
import { ZodError } from "zod";

export class HandleErrosMiddleware {
    static execute = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
        if(error instanceof AppErrors){
            return res.status(error.status).json({ message: error.message });
        } else if(error instanceof ZodError){
            return res.status(400).json(error);
        } else {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }
    }
}