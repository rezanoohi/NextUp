import {Router} from "express";
import {
    deleteAccountController,
    getSessionsController,
    loginController,
    logoutController,
    refreshTokenController,
    registerController
} from "./auth.controllers.js";
import {authMiddleware} from "../../common/middlewares/authMiddleware.js";
import {inputValidator} from "../../common/middlewares/inputValidator.js";
import {loginSchema, logoutSchema, registerSchema} from "./auth.schema.js";

const router = Router();

router.route('/register').post(inputValidator(registerSchema), registerController);
router.route('/login').post(inputValidator(loginSchema), loginController);
router.route('/refresh').post(refreshTokenController);
router.use(authMiddleware);
router.route('/logout').post(inputValidator(logoutSchema), logoutController);
router.route('/sessions').get(getSessionsController);
router.route('/account').delete(deleteAccountController);

export default router;