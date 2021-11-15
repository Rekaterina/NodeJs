import { Model } from 'sequelize/types';
import { User, UserBase } from './IUser';

export interface IUserService {
    createPredefinedUsers?(amount: number): void;
    getUser(id: string): Promise<Model<User> | null> | Promise<User | null>;
    createUser(userToCreate: UserBase): Promise<Model<User>> | Promise<User | null>;
    deleteUser(id: string): Promise<number>;
    updateUser(id: string, userFieldsToUpdate: UserBase): Promise<number>;
    getAutoSuggestUsers({
        loginSubstring,
        limit,
    }: {
        loginSubstring: string;
        limit: number;
    }): Promise<Model<User>[]> | Promise<User[]>;
}
