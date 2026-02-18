import {pool} from "../../config/db.js";

const getAllTodosModel = async (userID) => {
    const todos = await pool.query(`
    SELECT id, title, description, is_done 
    FROM todos
    WHERE user_id = $1
    ORDER BY created_at;
    `, [userID]);
    return todos.rows;
}

const createTodoModel = async (userID, title, description, isDone) => {
    const todo = await pool.query(`
        INSERT INTO todos (user_id, title, description, is_done)
        VALUES($1, $2, $3, $4)
        RETURNING id, title, description, is_done;
    `, [userID, title, description, isDone]);

    return todo.rows[0];
}

const updateTodoModel = async (todoID, title, description, isDone) => {
    const updatedTodo = await pool.query(`
        UPDATE todos
        SET 
            title = COALESCE($2, title),
            description = COALESCE($3, description),
            is_done = COALESCE($4, is_done)
        WHERE id = $1
        RETURNING id, title, description, is_done;
    `, [todoID, title ?? null, description ?? null, isDone ?? null]);
    return updatedTodo.rows[0]
}

const deleteTodoModel = async (todoID) => {
    const deletedTodo = await pool.query(`
        DELETE FROM todos
        WHERE id = $1
        RETURNING id
    `, [todoID]);
    return deletedTodo.rows[0];
}

export {createTodoModel, getAllTodosModel, updateTodoModel, deleteTodoModel}