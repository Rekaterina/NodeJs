const { Sequelize } = require('sequelize');

import { defineGroupModel } from '../models/group.model';
import { defineUserModel } from '../models/user.model';
import { defineUserGroupModel } from '../models/userGroup.model';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
});

export const UserModel = defineUserModel(sequelize);
export const GroupModel = defineGroupModel(sequelize);
export const UserGroupModel = defineUserGroupModel(sequelize, UserModel, GroupModel);

export const sequelizeLoader = async () => {
    UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
    GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
    await Promise.all([UserModel.sync({ force: true }), GroupModel.sync({ force: true })]);
    await UserGroupModel.sync({ force: true });
};
