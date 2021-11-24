import { HasManyAddAssociationMixin, Model } from 'sequelize';

import { User } from './IUser';

export interface GroupBase {
    name: string;
    permissions: Permission[];
}

export interface Group extends GroupBase {
    id: string;
}

export interface DbGroup extends Model<Group>, Group {
    addUser: HasManyAddAssociationMixin<User, User['id']>;
}

export enum Permission {
    Read = 'READ',
    Write = 'WRITE',
    Delete = 'DELETE',
    Share = 'SHARE',
    UploadFiles = 'UPLOAD_FILES',
}
