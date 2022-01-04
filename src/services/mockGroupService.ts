import { Group, GroupBase } from '../interfaces/IGroup';
import { IGroupService } from '../interfaces/IGroupService';

export const mockGroupId = 'groupId';

export class MockGroupService implements IGroupService {
    groups: Group[] = [];

    getGroup(id: string): Promise<Group | null> {
        const result = this.groups.find((group) => group.id === id) ?? null;
        return Promise.resolve(result);
    }

    getAllGroups(): Promise<Group[]> {
        return Promise.resolve(this.groups);
    }

    createGroup(groupToCreate: GroupBase): Promise<Group> {
        const createdGroup = {
            ...groupToCreate,
            id: mockGroupId,
        };
        return Promise.resolve(createdGroup);
    }

    deleteGroup(id: string): Promise<number> {
        let deletedGroupCount: number;
        const indexOfGroupToDelete = this.groups.findIndex((group) => group.id === id);

        if (indexOfGroupToDelete === -1) {
            deletedGroupCount = 0;
        } else {
            this.groups.splice(indexOfGroupToDelete, 1);
            deletedGroupCount = 1;
        }
        return Promise.resolve(deletedGroupCount);
    }

    updateGroup(id: string, groupFieldsToUpdate: GroupBase): Promise<number> {
        let updatedGroupCount: number;
        const indexOfGroupToUpdate = this.groups.findIndex((group) => group.id === id);

        if (indexOfGroupToUpdate === -1) {
            updatedGroupCount = 0;
        } else {
            this.groups.map((group) => (group.id === id ? Object.assign(group, groupFieldsToUpdate) : group));
            updatedGroupCount = 1;
        }
        return Promise.resolve(updatedGroupCount);
    }
}
