import * as express from 'express';

import { LoginService } from '../../services/loginService';
import { UserDbService } from '../../services/userDbService';
import { STATUS_CODE } from '../constants';
import { LoginController } from '../controllers/login';
import { ApiError } from '../middlewares/errorsHandler';

export const router = express.Router();

const userService = new UserDbService();
const loginService = new LoginService(userService);
const loginController = new LoginController(loginService);

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { password } = req.body;
        const username = req.body.login;
        const token = await loginController.login(username, password);

        if (!token) {
            throw new ApiError(
                STATUS_CODE.UNAUTHORIZED,
                `User with login: ${username} and password: ${password} does not exist`,
            );
        }
        return res.status(STATUS_CODE.OK).json(token);
    } catch (error) {
        return next(error);
    }
});
