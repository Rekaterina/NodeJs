import * as express from 'express';
import { UserDbService } from '../../services/userDbService';

import { STATUS_CODE } from '../constants';
import { UserController } from '../controllers/user';
import { ApiError } from '../middlewares/errorsHandler';
import { validateUser } from '../middlewares/userValidator';

export const router = express.Router();

const userService = new UserDbService();
const userController = new UserController(userService);

router.get('/suggest', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const suggestedUsers = await userController.getAutoSuggestUsers(req.body);
        if (suggestedUsers.length === 0) {
            throw new ApiError(STATUS_CODE.NOT_FOUND, `Users with ${req.body.loginSubstring} in login not found`);
        } else {
            res.status(STATUS_CODE.OK).json(suggestedUsers);
        }
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = req.params.id;
    const user = await userController.getUser(userId);
    try {
        if (user) {
            res.status(STATUS_CODE.OK).json(user);
        } else {
            throw new ApiError(STATUS_CODE.NOT_FOUND, `User with id ${userId} not found`);
        }
    } catch (error) {
        return next(error);
    }
});

router.post('/', validateUser(), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const createdUser = await userController.createUser(req.body);
        res.status(STATUS_CODE.CREATED).json(createdUser);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = req.params.id;
        const deletedUserCount = await userController.deleteUser(userId);

        if (deletedUserCount) {
            res.status(STATUS_CODE.OK).send(`User with id ${userId} was deleted`);
        } else {
            throw new ApiError(STATUS_CODE.NOT_FOUND, `User with id ${userId} not found`);
        }
    } catch (error) {
        return next(error);
    }
});

router.patch(
    '/:id',
    validateUser(),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const userId = req.params.id;
            const updatedUserCount = await userController.updateUser(userId, req.body);
            if (updatedUserCount) {
                res.status(STATUS_CODE.OK).json(`User with id ${userId} was updated`);
            } else {
                throw new ApiError(STATUS_CODE.NOT_FOUND, `User with id ${userId} not found`);
            }
        } catch (error) {
            return next(error);
        }
    },
);
