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

    async getUser(id: string): Promise<User | null> {
        const userFromDb = await UserModel.findOne({ where: { id } });
        return userFromDb != null ? this.transformDbUserToUser(userFromDb) : null;
    }

    async createUser(userToCreate: UserBase): Promise<User> {
        const createdUser = await UserModel.create({
            ...userToCreate,
            id: uuidv4(),
        });
        return this.transformDbUserToUser(createdUser);
    }

    deleteUser(id: string): Promise<number> {
        return UserModel.destroy({
            where: { id },
        });
    }

    async updateUser(id: string, userFieldsToUpdate: UserBase): Promise<number> {
        const updateUserResult = await UserModel.update(
            {
                ...userFieldsToUpdate,
            },
            {
                where: { id },
            },
        );
        const [updatedUserCount] = updateUserResult;
        return updatedUserCount;
    }

    async getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }): Promise<User[]> {
        const usersFromDb = await UserModel.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
            },
            limit,
        });
        return usersFromDb.map((user) => this.transformDbUserToUser(user));
    }

    private transformDbUserToUser(dbUser: Model<User>): User {
        return dbUser.get({ plain: true });
    }
}
