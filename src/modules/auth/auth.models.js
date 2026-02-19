import {pool} from "../../config/db.js";

const createUserModel = async (email, passwordHash, name, age) => {
    const newUser = await pool.query(`
    INSERT INTO users(email, password_hash, name, age)
    VALUES($1, $2, $3, $4)
    RETURNING id, email, name, age;
    `, [email, passwordHash, name, age]);
    return newUser.rows[0];
}

const findUserByEmailModel = async (email) => {
    const user = await pool.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email]);
    return user.rows[0];
}

const saveSessionModel = async (userID, deviceID, refreshToken, userAgent) => {
    await pool.query(`
        INSERT INTO sessions(user_id, device_id , refresh_token, user_agent)
        VALUES ($1, $2, $3, $4)
    `, [userID, deviceID, refreshToken, userAgent]);
}

const findRefreshTokenModel = async (refreshToken) => {
    const findRefreshToken = await pool.query(`
    SELECT *
    FROM sessions
    WHERE refresh_token = $1
    `, [refreshToken]);
    return findRefreshToken.rows[0]
}

const deleteRefreshTokenByDeviceIDModel = async (deviceID) => {
    await pool.query(`
    DELETE FROM sessions
    WHERE device_id = $1
    `, [deviceID]);
}

const deleteRefreshTokenModel = async (refreshToken) => {
    await pool.query(`
    DELETE FROM sessions
    WHERE refresh_token = $1
    `, [refreshToken]);
}

const getSessionModel = async (userID) => {
    const sessions = await pool.query(`
    SELECT id, user_id, device_id, user_agent, created_at
    FROM sessions
    WHERE user_id = $1
    ORDER BY created_at
    `, [userID]);
    return sessions.rows;
}

const deleteAccountModel = async (userID) => {
    const deletedAccount = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        RETURNING id, email, name, age
    `, [userID]);
    return deletedAccount.rows[0];
}

export {
    createUserModel,
    findUserByEmailModel,
    saveSessionModel,
    deleteRefreshTokenByDeviceIDModel,
    findRefreshTokenModel,
    deleteRefreshTokenModel,
    getSessionModel,
    deleteAccountModel
}