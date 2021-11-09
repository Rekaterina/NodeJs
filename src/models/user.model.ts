import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { User } from '../interfaces/IUser';

export function defineUserModel(sequelize: Sequelize): ModelCtor<Model<User>> {
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
