import {createTodoModel, deleteTodoModel, getAllTodosModel, updateTodoModel} from "./todo.models.js";
import {AppError} from "../../common/errors/AppError.js";

const getAllTodosService = async (userID) => {
    return await getAllTodosModel(userID);
}

const createTodoService = async (userID, title, description, isDone) => {
    return await createTodoModel(userID, title, description, isDone);
}

const updateTodoService = async (todoID, title, description, isDone) => {
    const updatedTodo = await updateTodoModel(todoID, title, description, isDone);
    if (!updatedTodo) throw new AppError(`Cannot find a todo with ID ${todoID}`, 404);
    return updatedTodo;
}
const deleteTodoService = async (todoID) => {
    const deletedTodo = await deleteTodoModel(todoID);
    if (!deletedTodo) throw new AppError(`Cannot find a todo with ID ${todoID}`, 404);
}

export {createTodoService, getAllTodosService, updateTodoService, deleteTodoService}