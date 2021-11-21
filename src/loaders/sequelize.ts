const { Sequelize } = require('sequelize');
import { Model, ModelCtor } from 'sequelize/types';

import { Group } from '../interfaces/IGroup';
import { User } from '../interfaces/IUser';
import { defineGroupModel } from '../models/group.model';
import { defineUserModel } from '../models/user.model';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
});

export const UserModel: ModelCtor<Model<User>> = defineUserModel(sequelize);
export const GroupModel: ModelCtor<Model<Group>> = defineGroupModel(sequelize);

export const sequelizeLoader = async () => {
    await Promise.all([UserModel.sync({ force: true }), GroupModel.sync({ force: true })]);
};
