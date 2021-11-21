import { IGroupService } from '../../interfaces/IGroupService';
import { Group, GroupBase } from '../../interfaces/IGroup';

export class GroupController {
    public groupService: IGroupService;

    constructor(groupService: IGroupService) {
        this.groupService = groupService;
    }

    getGroup(groupId: string): Promise<Group | null> {
        return this.groupService.getGroup(groupId);
    }

    getAllGroups(): Promise<Group[]> {
        return this.groupService.getAllGroups();
    }

    createGroup(groupToCreate: GroupBase): Promise<Group> {
        return this.groupService.createGroup(groupToCreate);
    }

    deleteGroup(groupId: string): Promise<number> {
        return this.groupService.deleteGroup(groupId);
    }

    updateGroup(groupId: string, groupFieldsToUpdate: GroupBase): Promise<number> {
        return this.groupService.updateGroup(groupId, groupFieldsToUpdate);
    }
}
