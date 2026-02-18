import jwt from "jsonwebtoken";

import {AppError} from "../errors/AppError.js";
import {ACCESS_TOKEN_SECRET} from "../../config/env.js";

export const authMiddleware = (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        throw new AppError('No token provided', 401);
    }

    try {
        // Check if token is valid or not, and extract the ID
        const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userID = decode.sub;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new AppError('Access token expired', 401);
        } else if (err.name === 'JsonWebTokenError') {
            throw new AppError('Invalid token', 401);
        }
        throw new AppError('Unauthorized', 401)
    }

}