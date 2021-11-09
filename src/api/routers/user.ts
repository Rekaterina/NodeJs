import * as express from 'express';

import { UserService } from '../../services/userService';
import { STATUS_CODE } from '../constants';
import { validateUser } from '../middlewares/userValidator';

export const router = express.Router();

router.get('/suggest', async (req: express.Request, res: express.Response) => {
    try {
        const suggestedUsers = await UserService.getAutoSuggestUsers(req.body);
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
        const user = await UserService.getUser(userId);
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
        const createdUser = await UserService.createUser(req.body);
        res.status(STATUS_CODE.CREATED).json(createdUser);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const deletedUserCount = await UserService.deleteUser(userId);

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
        const [updatedUserCount] = await UserService.updateUser(userId, req.body);
        if (updatedUserCount) {
            res.status(STATUS_CODE.OK).json(`User with id ${userId} was updated`);
        } else {
            res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});
