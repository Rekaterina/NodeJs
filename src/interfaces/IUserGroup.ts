import { Model } from 'sequelize/types';

export interface UserGroupBase {
    userId: string;
    groupId: string;
}

export interface UserGroup extends UserGroupBase {
    id: string;
}

export interface DbUserGroup extends Model<UserGroup>, UserGroup {}
