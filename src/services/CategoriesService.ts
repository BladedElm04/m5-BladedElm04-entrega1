import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";
import { TCreateCategory } from "../interfaces";
import { injectable } from "tsyringe";

@injectable()
export class CategoriesService {
    create = async (payload: TCreateCategory): Promise<Category> => {
        return await prisma.category.create({data: payload});
    };

    delete = async (id: number): Promise<void> => {
        await prisma.category.delete({where: { id }})
    }
};