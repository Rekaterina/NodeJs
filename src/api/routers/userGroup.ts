import * as express from 'express';

import { TRANSACTION_STATUS } from '../../services/constants';
import { GroupDbService } from '../../services/GroupDbService';
import { UserDbService } from '../../services/userDbService';
import { UserGroupDbService } from '../../services/userGroupDbService';
import { STATUS_CODE } from '../constants';
import { UserGroupController } from '../controllers/userGroup';
import { ApiError } from '../middlewares/errorsHandler';
import { validateUsersToGroup } from '../middlewares/usersToGroupValidator';

export const router = express.Router();

const userService = new UserDbService();
const groupService = new GroupDbService();
const userGroupService = new UserGroupDbService(groupService, userService);
const userGroupController = new UserGroupController(userGroupService);

router.get('/', async (_, res: express.Response, next: express.NextFunction) => {
    try {
        const userGroups = await userGroupController.getAllUserGroups();
        res.status(STATUS_CODE.OK).json(userGroups);
    } catch (error) {
        return next(error);
    }
});

router.post(
    '/addUsers',
    validateUsersToGroup(),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { groupId, userIds } = req.body;
            const result = await userGroupController.addUsersToGroup(groupId, userIds);
            if (result === TRANSACTION_STATUS.OK) {
                res.status(STATUS_CODE.CREATED).json(
                    `Users with ids: ${userIds} were added to group with id: ${groupId}`,
                );
            } else {
                throw new ApiError(
                    STATUS_CODE.BAD_REQUEST,
                    `Users with ids: ${userIds} have not been added to group with id: ${groupId}`,
                );
            }
        } catch (error) {
            return next(error);
        }
    },
);
