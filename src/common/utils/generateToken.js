import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET
} from "../../config/env.js";

export const generateToken = (userID) => {

    const accessToken = jwt.sign({sub: userID}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
    const refreshToken = jwt.sign({sub: userID}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});

    return {accessToken, refreshToken};

}
