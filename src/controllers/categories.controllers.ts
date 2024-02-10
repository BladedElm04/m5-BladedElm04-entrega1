import { inject, injectable } from "tsyringe";
import { CategoriesService } from "../services/CategoriesService";
import { Request, Response } from "express";
import { prisma } from "../database/prisma";

@injectable()
export class CategoriesController {
    constructor (@inject("CategoriesService") private categoriesServices: CategoriesService) {};

    create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoriesServices.create(req.body);

        return res.status(201).json(newCategory);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoriesServices.delete(Number(req.params.id));

        return res.status(204).json()
    }
}