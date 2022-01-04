import { Group, GroupBase, Permission } from '../../interfaces/IGroup';
import { mockGroupId, MockGroupService } from '../../services/mockGroupService';
import { GroupController } from './group';

const testGroup1: Group = {
    id: mockGroupId,
    name: 'group1',
    permissions: [Permission.Read, Permission.Write],
};

const testGroup2: Group = {
    id: 'groupId2',
    name: 'group2',
    permissions: [Permission.Read, Permission.Write, Permission.Delete, Permission.Share],
};

const testGroupToCreate: GroupBase = {
    name: 'group1',
    permissions: [Permission.Read, Permission.Write],
};

const testGroupToUpdate: GroupBase = {
    name: 'group1',
    permissions: [Permission.Read],
};

describe('GroupController', () => {
    const mockGroupService = new MockGroupService();
    const groupController = new GroupController(mockGroupService);

    beforeEach(() => {
        mockGroupService.groups = [];
    });

    describe('getGroup', () => {
        it('should return group if group exists', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.getGroup(mockGroupId);
            expect(result).toStrictEqual(testGroup1);
        });
        it('should return null if group does not exist', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.getGroup('wrongId');
            expect(result).toBe(null);
        });
    });

    describe('getAllGroups', () => {
        it('should return all groups', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.getAllGroups();
            expect(result).toStrictEqual([testGroup1, testGroup2]);
        });
    });

    describe('createGroup', () => {
        it('should return created group', async () => {
            const result = await groupController.createGroup(testGroupToCreate);
            expect(result).toStrictEqual(testGroup1);
        });
    });

    describe('deleteGroup', () => {
        it('should return 1 if group exists', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.deleteGroup(mockGroupId);
            expect(result).toBe(1);
        });
        it('should return 0 if group does not exist', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.deleteGroup('wrongId');
            expect(result).toBe(0);
        });
    });

    describe('updateGroup', () => {
        it('should return 1 if group exists', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.updateGroup(mockGroupId, testGroupToUpdate);
            expect(result).toBe(1);
        });
        it('should return 0 if group does not exist', async () => {
            mockGroupService.groups = [{ ...testGroup1 }, { ...testGroup2 }];
            const result = await groupController.updateGroup('wrongId', testGroupToUpdate);
            expect(result).toBe(0);
        });
    });
});
