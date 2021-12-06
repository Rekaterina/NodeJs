import { UserGroup } from './IUserGroup';

export interface IUserGroupService {
    getAllUserGroups(): Promise<UserGroup[]>;
    addUsersToGroup(groupId: string, userIds: string[]): Promise<string>;
}
