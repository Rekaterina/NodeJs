import { DataTypes, ModelCtor, Sequelize } from 'sequelize';

import { DbUser } from '../interfaces/IUser';

export function defineUserModel(sequelize: Sequelize): ModelCtor<DbUser> {
    return sequelize.define(
        'User',
        {
            id: { type: DataTypes.STRING, primaryKey: true },
            login: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            age: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            createdAt: false,
            updatedAt: false,
        },
    );
}
