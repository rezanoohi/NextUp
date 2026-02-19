import {Router} from "express";
import {
    createTodoController,
    deleteTodoController,
    getAllTodosController,
    updateTodoController
} from "./todo.controllers.js";
import {authMiddleware} from "../../common/middlewares/authMiddleware.js";
import {inputValidator} from "../../common/middlewares/inputValidator.js";
import {createTodoSchema, todoIDSchema, updateTodoSchema} from "./todo.schema.js";

const router = Router();

router.use(authMiddleware)

router.route('/')
    .post(inputValidator(createTodoSchema), createTodoController)
    .get(getAllTodosController);
router.route('/:id')
    .patch(inputValidator(updateTodoSchema), inputValidator(todoIDSchema, 'params'), updateTodoController)
    .delete(inputValidator(todoIDSchema, 'params'), deleteTodoController);

export default router;