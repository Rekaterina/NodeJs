import { v4 as uuidv4 } from 'uuid';

import { DbGroup, Group, GroupBase } from '../interfaces/IGroup';
import { IGroupDbService } from '../interfaces/IGroupDbService';
import { IGroupService } from '../interfaces/IGroupService';
import { GroupModel } from '../loaders/sequelize';
import { getRandomGroups } from './helpers';

export class GroupDbService implements IGroupService, IGroupDbService {
    createPredefinedGroups(amount: number) {
        GroupModel.bulkCreate(getRandomGroups(amount));
    }

    async getGroup(id: string): Promise<Group | null> {
        const groupFromDb = await GroupModel.findOne({ where: { id } });
        return groupFromDb != null ? this.transformDbGroupToGroup(groupFromDb) : null;
    }

    async getDbGroup(id: string): Promise<DbGroup | null> {
        return await GroupModel.findOne({ where: { id } });
    }

    async getAllGroups(): Promise<Group[]> {
        const groupsFromDb = await GroupModel.findAll();
        return groupsFromDb.map((group) => this.transformDbGroupToGroup(group));
    }

    async createGroup(groupToCreate: GroupBase): Promise<Group> {
        const createdGroup = await GroupModel.create({
            ...groupToCreate,
            id: uuidv4(),
        });
        return this.transformDbGroupToGroup(createdGroup);
    }

    deleteGroup(id: string): Promise<number> {
        return GroupModel.destroy({
            where: { id },
        });
    }

    async updateGroup(id: string, groupFieldsToUpdate: GroupBase): Promise<number> {
        const updatedGroupResult = await GroupModel.update(
            {
                ...groupFieldsToUpdate,
            },
            {
                where: { id },
            },
        );
        const [updatedGroupCount] = updatedGroupResult;
        return updatedGroupCount;
    }

    private transformDbGroupToGroup(dbGroup: DbGroup): Group {
        return dbGroup.get({ plain: true });
    }
}
