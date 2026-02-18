import argon2 from "argon2";
import jwt from 'jsonwebtoken';

import {
    createUserModel, deleteRefreshTokenByDeviceIDModel,
    deleteRefreshTokenModel,
    findRefreshTokenModel,
    findUserByEmailModel,
    saveRefreshTokenModel
} from "./auth.models.js";
import {AppError} from "../../common/errors/AppError.js";
import {REFRESH_TOKEN_SECRET} from "../../config/env.js";
import {generateToken} from "../../common/utils/generateToken.js";
import {refreshTokenHash} from "../../common/utils/refreshTokenHash.js";

const registerService = async (email, password, name, age, deviceID, userAgent) => {
    try {
        const passwordHash = await argon2.hash(password, {
            type: 2,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1
        });
        const newUser = await createUserModel(email, passwordHash, name, age);
        const {accessToken, refreshToken} = generateToken(newUser.id);
        await saveRefreshTokenModel(newUser.id, deviceID, refreshTokenHash(refreshToken), userAgent);

        return {email: newUser.email, name: newUser.name, age: newUser.age, accessToken, refreshToken};
    } catch (err) {
        if (err.code === '23505') throw new AppError('Email already exists', 409);
        if (err.code === '23514') throw new AppError('Age must be between 0 and 150', 400);
        throw err;
    }
}

const loginService = async (email, password, deviceID, userAgent) => {
    const user = await findUserByEmailModel(email);
    if (!user) throw new AppError('Invalid email or password', 401);
    const isPasswordValid = await argon2.verify(user['password_hash'], password);
    if (!isPasswordValid) throw new AppError('Invalid email or password', 401);
    const {accessToken, refreshToken} = generateToken(user.id);
    // Replace existing refresh token for this device (if any)
    await deleteRefreshTokenByDeviceIDModel(deviceID);
    await saveRefreshTokenModel(user.id, deviceID, refreshTokenHash(refreshToken), userAgent);

    return {email: user.email, name: user.name, age: user.age, accessToken, refreshToken};
}

const getNewAccessTokenService = async (refreshToken) => {
    const findRefreshToken = await findRefreshTokenModel(refreshTokenHash(refreshToken));
    if (!findRefreshToken) throw new AppError('Refresh token not found, please login', 403);
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // Rotate refresh token
        await deleteRefreshTokenModel(refreshTokenHash(refreshToken));
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = generateToken(decoded.sub);
        await saveRefreshTokenModel(decoded.sub, findRefreshToken['device_id'], refreshTokenHash(newRefreshToken), findRefreshToken['user_agent']);

        return {accessToken: newAccessToken, refreshToken: newRefreshToken}
    } catch (err) {
        await deleteRefreshTokenModel(refreshTokenHash(refreshToken));
        if (err.name === 'TokenExpiredError') {
            throw new AppError('Refresh token expired, login again', 401)
        }
        throw err;
    }
}

const logoutService = async (deviceID) => {
    await deleteRefreshTokenByDeviceIDModel(deviceID);
}

export {registerService, loginService, getNewAccessTokenService, logoutService};