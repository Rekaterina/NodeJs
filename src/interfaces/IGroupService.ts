import { Group, GroupBase } from './IGroup';

export interface IGroupService {
    createPredefinedGroups(amount: number): void;
    getGroup(id: string): Promise<Group | null>;
    getAllGroups(): Promise<Group[]>;
    createGroup(groupToCreate: GroupBase): Promise<Group>;
    deleteGroup(id: string): Promise<number>;
    updateGroup(id: string, groupFieldsToUpdate: GroupBase): Promise<number>;
}
