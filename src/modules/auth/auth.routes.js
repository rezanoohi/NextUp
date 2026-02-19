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

const router = Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/refresh').post(refreshTokenController);
router.use(authMiddleware);
router.route('/logout').post(logoutController);
router.route('/sessions').get(getSessionsController);
router.route('/account').delete(deleteAccountController);

export default router;