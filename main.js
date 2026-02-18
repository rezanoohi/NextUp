import express from 'express';
import cookieParser from 'cookie-parser';

import {SERVER_PORT} from "./src/config/env.js";
import {errorHandler} from "./src/common/middlewares/errorHandler.js";
import {AppError} from "./src/common/errors/AppError.js";
import {initDB} from "./src/config/initDB.js";
import authRouter from './src/modules/auth/auth.routes.js';
import todoRouter from "./src/modules/todo/todo.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

app.use((req, res, next) => {
    throw new AppError(`Cannot find ${req.url} on server.`, 404);
});

// Error handler
app.use(errorHandler);

// Initialize database
await initDB();

app.listen(SERVER_PORT, () => {
    console.log(`[express] Server listening on port ${SERVER_PORT}`)
})