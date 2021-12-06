import * as express from 'express';

import { GroupDbService } from '../../services/GroupDbService';
import { STATUS_CODE } from '../constants';
import { GroupController } from '../controllers/group';
import { ApiError } from '../middlewares/errorsHandler';
import { validateGroup } from '../middlewares/groupValidator';

export const router = express.Router();

const groupService = new GroupDbService();
const groupController = new GroupController(groupService);

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const groupId = req.params.id;
        const group = await groupController.getGroup(groupId);
        if (group) {
            res.status(STATUS_CODE.OK).json(group);
        } else {
            throw new ApiError(STATUS_CODE.NOT_FOUND, `Group with id ${groupId} not found`);
        }
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (_, res: express.Response, next: express.NextFunction) => {
    try {
        const groups = await groupController.getAllGroups();
        res.status(STATUS_CODE.OK).json(groups);
    } catch (error) {
        return next(error);
    }
});

router.post('/', validateGroup(), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const createdGroup = await groupController.createGroup(req.body);
        res.status(STATUS_CODE.CREATED).json(createdGroup);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const groupId = req.params.id;
        const deletedGroupCount = await groupController.deleteGroup(groupId);

        if (deletedGroupCount) {
            res.status(STATUS_CODE.OK).send(`Group with id ${groupId} was deleted`);
        } else {
            throw new ApiError(STATUS_CODE.NOT_FOUND, `Group with id ${groupId} not found`);
        }
    } catch (error) {
        return next(error);
    }
});

router.patch(
    '/:id',
    validateGroup(),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const groupId = req.params.id;
            const updatedGroupCount = await groupController.updateGroup(groupId, req.body);
            if (updatedGroupCount) {
                res.status(STATUS_CODE.OK).json(`Group with id ${groupId} was updated`);
            } else {
                throw new ApiError(STATUS_CODE.NOT_FOUND, `Group with id ${groupId} not found`);
            }
        } catch (error) {
            return next(error);
        }
    },
);
