import { inject, injectable } from "tsyringe";
import { UserService } from "../services/UserServices";
import { Request, Response } from "express";
import { prisma } from "../database/prisma";

@injectable()
export class UserControllers{
    constructor(@inject("UserService") private userService: UserService) {};

    create = async (req: Request, res: Response): Promise<Response> => {
        const newUser = await this.userService.create(req.body);

        return res.status(201).json(newUser);
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        const token = await this.userService.login(req.body);

        return res.status(200).json(token)
    };

    autologin = async (req: Request, res: Response): Promise<Response> => {
        const id = res.locals.decode?.id

        const user = await this.userService.autologin(id);

        return res.status(200).json(user);
    }
}