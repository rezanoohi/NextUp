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

const saveRefreshTokenModel = async (userID, deviceID, refreshToken, userAgent) => {
    await pool.query(`
        INSERT INTO refresh_tokens(user_id, device_id , refresh_token, user_agent)
        VALUES ($1, $2, $3, $4)
    `, [userID, deviceID, refreshToken, userAgent]);
}

const findRefreshTokenModel = async (refreshToken) => {
    const findRefreshToken = await pool.query(`
    SELECT *
    FROM refresh_tokens
    WHERE refresh_token = $1
    `, [refreshToken]);
    return findRefreshToken.rows[0]
}

const deleteRefreshTokenByDeviceIDModel = async (deviceID) => {
    await pool.query(`
    DELETE FROM refresh_tokens
    WHERE device_id = $1
    `, [deviceID]);
}

const deleteRefreshTokenModel = async (refreshToken) => {
    await pool.query(`
    DELETE FROM refresh_tokens
    WHERE refresh_token = $1
    `, [refreshToken]);
}

export {
    createUserModel,
    findUserByEmailModel,
    saveRefreshTokenModel,
    deleteRefreshTokenByDeviceIDModel,
    findRefreshTokenModel,
    deleteRefreshTokenModel,
}