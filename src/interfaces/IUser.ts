import { Model } from 'sequelize/types';

export interface UserBase {
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

export interface User extends UserBase {
    id: string;
}

export interface DbUser extends Model<User>, User {}
