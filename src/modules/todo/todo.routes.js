import {Router} from "express";
import {
    createTodoController,
    deleteTodoController,
    getAllTodosController,
    updateTodoController
} from "./todo.controllers.js";
import {authMiddleware} from "../../common/middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware)
router.route('/').post(createTodoController).get(getAllTodosController);
router.route('/:id').patch(updateTodoController).delete(deleteTodoController);

export default router;