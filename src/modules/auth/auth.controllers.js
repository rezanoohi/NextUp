import {
    loginService,
    getNewAccessTokenService,
    registerService,
    logoutService,
    getSessionsService
} from "./auth.services.js";
import {sendResponse} from "../../common/utils/sendResponse.js";
import {AppError} from "../../common/errors/AppError.js";

const registerController = async (req, res) => {
    const {email, password, name, age, deviceID} = req.body;
    const userAgent = req.headers['user-agent'];
    const newUser = await registerService(email, password, name, age, deviceID, userAgent);
    sendResponse(res, 201, newUser);
}

const loginController = async (req, res) => {
    const {email, password, deviceID} = req.body;
    const userAgent = req.headers['user-agent'];
    const user = await loginService(email, password, deviceID, userAgent);

    sendResponse(res, 200, user)
}

const refreshTokenController = async (req, res) => {
    let refreshToken;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        refreshToken = req.headers.authorization.split(' ')[1];
    } else {
        throw new AppError('No refresh token provided', 401);
    }

    const newToken = await getNewAccessTokenService(refreshToken);
    sendResponse(res, 200, newToken)

}

const logoutController = async (req, res) => {
    const deviceID = req.body['deviceID'];
    await logoutService(deviceID);
    sendResponse(res, 200, 'Logout successfully')
}
const getSessionsController = async (req, res) => {
    const userID = req.userID;
    const sessions = await getSessionsService(userID);
    sendResponse(res, 200, sessions);
}
const deleteAccountController = async (req, res) => {
}

export {
    registerController,
    loginController,
    refreshTokenController,
    logoutController,
    getSessionsController,
    deleteAccountController
}