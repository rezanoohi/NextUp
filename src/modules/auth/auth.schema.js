import {z} from 'zod';

const registerSchema = z.object({
    email: z.email().trim(),
    password: z.string().trim(),
    deviceID: z.uuid().trim(),
    name: z.string().trim().optional(),
    age: z.int().min(0).max(150).optional()
}).strict();

const loginSchema = z.object({
    email: z.email().trim(),
    password: z.string().trim(),
    deviceID: z.uuid().trim()
}).strict();

const logoutSchema = z.object({
    deviceID: z.uuid().trim()
}).strict();

export {registerSchema, loginSchema, logoutSchema}