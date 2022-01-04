const { Sequelize } = require('sequelize');

import { CONFIG } from '../config/config';
import { defineGroupModel } from '../models/group.model';
import { defineUserModel } from '../models/user.model';
import { defineUserGroupModel } from '../models/userGroup.model';

export const sequelize = new Sequelize({
    database: CONFIG.DB_NAME,
    username: CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    host: CONFIG.DB_HOST,
    port: CONFIG.DB_PORT,
    dialect: CONFIG.DB_DIALECT,
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
