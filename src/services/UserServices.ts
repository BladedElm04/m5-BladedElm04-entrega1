import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt"
import { prisma } from "../database/prisma";
import { TCreateUser, TLoginUser, TReturnUser } from "../interfaces";
import { returnUserSchema } from "../schemas/user.schema";
import { injectable } from "tsyringe";
import { AppErrors } from "../errors/appErrors";
import { TLoginReturn } from "../interfaces/users.interfaces";

@injectable()
export class UserService{
    create = async (payload: TCreateUser): Promise<TReturnUser> => {
        const hashPassword = await bcrypt.hash(payload.password, 10);

        const user = {
            ...payload,
            password: hashPassword
        }

        const newUser = await prisma.user.create({data: user});

        return returnUserSchema.parse(newUser);
    };

    login = async (payload:TLoginUser): Promise<TLoginReturn> => {

        const foundUser = await prisma.user.findFirst({where: {email: payload.email}});

        if(!foundUser){
            throw new AppErrors("User not exists", 404);
        }

        const pwdMatch = await bcrypt.compare(payload.password, foundUser.password);

        if(!pwdMatch){
            throw new AppErrors("Email and password doesn't match", 401);
        }

        const secret = process.env.JWT_SECRET!;
        const token = jwt.sign({id: foundUser.id}, secret, {expiresIn: "24h"});

        return { accessToken: token, user: returnUserSchema.parse(foundUser) }
    };

    autologin = async (id?: number) => {
        const user = await prisma.user.findFirst({where: {id}});

        return returnUserSchema.parse(user);
    }
}