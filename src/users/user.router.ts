import * as express from 'express';

import { STATUS_CODE } from '../constants';
import * as userService from './user.service';
import { validateUser } from './user.validator';

export const router = express.Router();

router.get('/suggest', (req: express.Request, res: express.Response) => {
    const suggestedUsers = userService.getAutoSuggestUsers(req.body);
    if (suggestedUsers.length === 0) {
        res.status(STATUS_CODE.NOT_FOUND).send(`Users with ${req.body.loginSubstring} in login not found`);
    } else {
        res.status(STATUS_CODE.OK).json(suggestedUsers);
    }
});

router.get('/:id', (req: express.Request, res: express.Response) => {
    const userId = req.params.id;
    const user = userService.getUser(userId);
    if (user) {
        res.status(STATUS_CODE.OK).json(user);
    } else {
        res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
    }
});

router.post('/', validateUser(), (req: express.Request, res: express.Response) => {
    const createdUser = userService.createUser(req.body);
    if (createdUser) {
        res.status(STATUS_CODE.CREATED).json(createdUser);
    } else {
        res.status(STATUS_CODE.NOT_FOUND).send(`User with login ${req.body.login} already exists`);
    }
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
    const userId = req.params.id;
    const deletedUser = userService.deleteUser(userId);
    if (deletedUser) {
        res.status(STATUS_CODE.OK).send(`User with id ${userId} was deleted`);
    } else {
        res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
    }
});

router.patch('/:id', validateUser(), (req: express.Request, res: express.Response) => {
    const userId = req.params.id;
    const updatedUser = userService.updateUser(userId, req.body);
    if (updatedUser) {
        res.status(STATUS_CODE.OK).json(updatedUser);
    } else {
        res.status(STATUS_CODE.NOT_FOUND).send(`User with id ${userId} not found`);
    }
});
