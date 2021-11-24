import { DbUserGroup, UserGroup } from '../interfaces/IUserGroup';
import { IUserGroupService } from '../interfaces/IUserGroupService';
import { sequelize, UserGroupModel } from '../loaders/sequelize';
import { TRANSACTION_STATUS } from './constants';
import { GroupDbService } from './GroupDbService';
import { UserDbService } from './userDbService';

const userService = new UserDbService();
const groupService = new GroupDbService();

export class UserGroupDbService implements IUserGroupService {
    public groupDbService = groupService;
    public userDbService = userService;

    async addUsersToGroup(groupId: string, userIds: string[]): Promise<string> {
        const transaction = await sequelize.transaction();

        try {
            const group = await this.groupDbService.getDbGroup(groupId);
            if (group == null) {
                return TRANSACTION_STATUS.ERROR;
            }

            const users = await this.userDbService.getDbUsersByUserIds(userIds);
            await Promise.all(users.map((user) => group.addUser(user, { transaction })));
            await transaction.commit();

            return TRANSACTION_STATUS.OK;
        } catch (error) {
            await transaction.rollback();
            return TRANSACTION_STATUS.ERROR;
        }
    }

    async getAllUserGroups(): Promise<UserGroup[]> {
        const userGroupsFromDb = await UserGroupModel.findAll();
        return userGroupsFromDb.map((userGroup) => this.transformDbUserGroupToUserGroup(userGroup));
    }

    private transformDbUserGroupToUserGroup(dbUserGroup: DbUserGroup): UserGroup {
        return dbUserGroup.get({ plain: true });
    }
}
