import { Model, Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { User, UserBase } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';
import { UserModel } from '../loaders/sequelize';
import { getRandomUsers } from './helpers';

export class UserDbService implements IUserService {
    createPredefinedUsers(amount: number) {
        UserModel.bulkCreate(getRandomUsers(amount));
    }

    getUser(id: string): Promise<Model<User> | null> {
        return UserModel.findOne({ where: { id }, raw: true });
    }

    createUser(userToCreate: UserBase): Promise<Model<User>> {
        return UserModel.create({
            ...userToCreate,
            id: uuidv4(),
        });
    }

    deleteUser(id: string): Promise<number> {
        return UserModel.destroy({
            where: { id },
        });
    }

    updateUser(id: string, userFieldsToUpdate: UserBase): Promise<number> {
        return UserModel.update(
            {
                ...userFieldsToUpdate,
            },
            {
                where: { id },
            },
        ).then((result) => result[0]);
    }

    getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }): Promise<Model<User>[]> {
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
