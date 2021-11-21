import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

import { Group, Permission } from '../interfaces/IGroup';

export function defineGroupModel(sequelize: Sequelize): ModelCtor<Model<Group>> {
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
