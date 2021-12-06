import { DataTypes, ModelCtor, Sequelize } from 'sequelize';

import { DbGroup, Permission } from '../interfaces/IGroup';

export function defineGroupModel(sequelize: Sequelize): ModelCtor<DbGroup> {
    return sequelize.define(
        'Group',
        {
            id: { type: DataTypes.STRING, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            permissions: {
                type: DataTypes.ARRAY(
                    DataTypes.ENUM({
                        values: Object.values(Permission),
                    }),
                ),
                allowNull: false,
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        },
    );
}
