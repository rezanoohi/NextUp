import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

import {ALLOWED_ORIGINS, PORT} from "./src/config/env.js";
import {errorHandler} from "./src/common/middlewares/errorHandler.js";
import {AppError} from "./src/common/errors/AppError.js";
import {initDB} from "./src/config/initDB.js";
import authRouter from './src/modules/auth/auth.routes.js';
import todoRouter from "./src/modules/todo/todo.routes.js";
import {openapiSpecification} from "./docs/openapi.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
}));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', todoRouter);

// Swagger doc
app.use('/doc', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use((req, res, next) => {
    throw new AppError(`Cannot find ${req.url} on server.`, 404);
});

// Error handler
app.use(errorHandler);

// Initialize database
await initDB();

app.listen(PORT, () => {
    console.log(`[express] Server listening on port ${PORT}`)
})