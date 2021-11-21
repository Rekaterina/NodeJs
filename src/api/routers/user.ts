import * as express from 'express';
import { UserDbService } from '../../services/userDbService';

import { STATUS_CODE } from '../constants';
import { UserController } from '../controllers/user';
import { validateUser } from '../middlewares/userValidator';

export const router = express.Router();

const userService = new UserDbService();
const userController = new UserController(userService);

router.get('/suggest', async (req: express.Request, res: express.Response) => {
    try {
        const suggestedUsers = await userController.getAutoSuggestUsers(req.body);
        if (suggestedUsers.length === 0) {
            res.status(STATUS_CODE.NOT_FOUND).send(`Users with ${req.body.loginSubstring} in login not found`);
        } else {
            res.status(STATUS_CODE.OK).json(suggestedUsers);
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const user = await userController.getUser(userId);
        if (user) {
            res.status(STATUS_CODE.OK).json(user);
        } else {
            res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.post('/', validateUser(), async (req: express.Request, res: express.Response) => {
    try {
        const createdUser = await userController.createUser(req.body);
        res.status(STATUS_CODE.CREATED).json(createdUser);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const deletedUserCount = await userController.deleteUser(userId);

        if (deletedUserCount) {
            res.status(STATUS_CODE.OK).send(`User with id ${userId} was deleted`);
        } else {
            res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.patch('/:id', validateUser(), async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const updatedUserCount = await userController.updateUser(userId, req.body);
        if (updatedUserCount) {
            res.status(STATUS_CODE.OK).json(`User with id ${userId} was updated`);
        } else {
            res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});
