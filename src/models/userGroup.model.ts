import { DataTypes, ModelCtor, Sequelize, UUIDV4 } from 'sequelize';

import { DbGroup } from '../interfaces/IGroup';
import { DbUser } from '../interfaces/IUser';
import { DbUserGroup } from '../interfaces/IUserGroup';

export function defineUserGroupModel(
    sequelize: Sequelize,
    UserModel: ModelCtor<DbUser>,
    GroupModel: ModelCtor<DbGroup>,
): ModelCtor<DbUserGroup> {
    return sequelize.define(
        'UserGroup',
        {
            id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
            UserId: {
                type: DataTypes.STRING,
                references: {
                    key: 'id',
                    model: UserModel,
                },
            },
            GroupId: {
                type: DataTypes.STRING,
                references: {
                    key: 'id',
                    model: GroupModel,
                },
            },
        },
        {
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
        },
    );
}
