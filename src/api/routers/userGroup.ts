import * as express from 'express';

import { TRANSACTION_STATUS } from '../../services/constants';
import { UserGroupDbService } from '../../services/userGroupDbService';
import { STATUS_CODE } from '../constants';
import { UserGroupController } from '../controllers/userGroup';
import { validateUsersToGroup } from '../middlewares/usersToGroupValidator';

export const router = express.Router();

const userGroupService = new UserGroupDbService();
const userGroupController = new UserGroupController(userGroupService);

router.get('/', async (_, res: express.Response) => {
    try {
        const userGroups = await userGroupController.getAllUserGroups();
        res.status(STATUS_CODE.OK).json(userGroups);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.post('/addUsers', validateUsersToGroup(), async (req: express.Request, res: express.Response) => {
    try {
        const { groupId, userIds } = req.body;
        const result = await userGroupController.addUsersToGroup(groupId, userIds);
        if (result === TRANSACTION_STATUS.OK) {
            res.status(STATUS_CODE.CREATED).json(`Users with ids: ${userIds} were added to group with id: ${groupId}`);
        } else {
            res.status(STATUS_CODE.CREATED).json(
                `Users with ids: ${userIds} have not been added to group with id: ${groupId}`,
            );
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
});
