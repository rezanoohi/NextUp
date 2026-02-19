import {z} from 'zod';

const createTodoSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim().optional(),
    isDone: z.boolean().optional()
}).strict();

const updateTodoSchema = z.object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    isDone: z.boolean().optional()
}).strict();

const todoIDSchema = z.object({
    id: z.uuid()
});

export {createTodoSchema, todoIDSchema, updateTodoSchema}