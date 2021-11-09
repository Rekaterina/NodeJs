import { Model, Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { User, UserBase } from '../interfaces/IUser';
import { UserModel } from '../loaders/sequelize';
import { getRandomUsers } from './helpers';

export class UserService {
    static createPredefinedUsers(amount: number) {
        UserModel.bulkCreate(getRandomUsers(amount));
    }

    static getUser(id: string): Promise<Model<User> | null> {
        return UserModel.findOne({ where: { id }, raw: true });
    }

    static createUser(userToCreate: UserBase): Promise<Model<User>> {
        return UserModel.create({
            ...userToCreate,
            id: uuidv4(),
        });
    }

    static deleteUser(id: string): Promise<number> {
        return UserModel.destroy({
            where: { id },
        });
    }

    static updateUser(id: string, userFieldsToUpdate: UserBase): Promise<[number, Model<User>[]]> {
        return UserModel.update(
            {
                ...userFieldsToUpdate,
            },
            {
                where: { id },
            },
        );
    }

    static getAutoSuggestUsers({
        loginSubstring,
        limit,
    }: {
        loginSubstring: string;
        limit: number;
    }): Promise<Model<User>[]> {
        return UserModel.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
            },
            limit,
        });
    }
}
