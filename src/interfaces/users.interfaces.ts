import { z } from "zod";
import { createUserSchema, loginUserSchema, returnUserSchema } from "../schemas/user.schema";

type TCreateUser = z.infer<typeof createUserSchema>;

type TLoginUser = z.infer<typeof loginUserSchema>;

type TLoginReturn = {
    accessToken: string,
    user: TReturnUser
}

type TReturnUser = z.infer<typeof returnUserSchema>;

export {TCreateUser, TReturnUser, TLoginUser, TLoginReturn};