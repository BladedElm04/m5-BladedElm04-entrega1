import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";
import { TCreateCategory } from "../interfaces";
import { injectable } from "tsyringe";

@injectable()
export class CategoriesService {
    create = async (userId: number, payload: TCreateCategory): Promise<Category> => {
        
        const newCategory = {
            ...payload,
            userId
        }

        return await prisma.category.create({data: newCategory});
    };

    delete = async (id: number): Promise<void> => {
        await prisma.category.delete({where: { id }})
    }
};