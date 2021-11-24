import { IUserGroupService } from '../../interfaces/IUserGroupService';
import { UserGroup } from '../../interfaces/IUserGroup';

export class UserGroupController {
    public userGroupService: IUserGroupService;

    constructor(userGroupService: IUserGroupService) {
        this.userGroupService = userGroupService;
    }

    getAllUserGroups(): Promise<UserGroup[]> {
        return this.userGroupService.getAllUserGroups();
    }

    addUsersToGroup(groupId: string, userIds: string[]): Promise<string> {
        return this.userGroupService.addUsersToGroup(groupId, userIds);
    }
}
