import { AnyZodObject } from "zod";

export interface IRequestSchema {
    params?: AnyZodObject,
    body?: AnyZodObject,
    query?: AnyZodObject
}