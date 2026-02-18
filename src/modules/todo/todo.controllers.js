import {createTodoService, deleteTodoService, getAllTodosService, updateTodoService} from "./todo.services.js";
import {sendResponse} from "../../common/utils/sendResponse.js";

const getAllTodosController = async (req, res) => {
    const userID = req.userID;
    const todos = await getAllTodosService(userID);
    sendResponse(res, 200, todos);
}

const createTodoController = async (req, res) => {
    const userID = req.userID;
    const {title, description, isDone} = req.body;

    const todo = await createTodoService(userID, title, description, isDone);

    sendResponse(res, 201, todo);
}

const updateTodoController = async (req, res) => {
    const todoID = req.params.id
    const {title, description, isDone} = req.body;

    const updatedTodo = await updateTodoService(todoID, title, description, isDone);

    sendResponse(res, 200, updatedTodo);
}

const deleteTodoController = async (req, res) => {
    const todoID = req.params.id;
    await deleteTodoService(todoID);
    sendResponse(res, 200, 'Deleted successfully');
}

export {createTodoController, getAllTodosController, updateTodoController, deleteTodoController}