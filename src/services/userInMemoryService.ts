import { v4 as uuidv4 } from 'uuid';

import { User, UserBase } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';

export class UserInMemoryService implements IUserService {
    private users: User[] = [];

    getUser(id: string): Promise<User | null> {
        const user = this.users.find((user) => user.id === id) ?? null;
        return Promise.resolve(user);
    }

    getUserByLogin(login: string): Promise<User | null> {
        const user = this.users.find((user) => user.login === login) ?? null;
        return Promise.resolve(user);
    }

    createUser(userToCreate: UserBase): Promise<User | null> {
        const indexOfUserWithSameLogin = this.users.findIndex((user) => user.login === userToCreate.login);
        if (indexOfUserWithSameLogin !== -1 && this.users[indexOfUserWithSameLogin].isDeleted === false) {
            return Promise.resolve(null);
        }
        if (indexOfUserWithSameLogin !== -1 && this.users[indexOfUserWithSameLogin].isDeleted === true) {
            this.users.map((user) =>
                user.login === this.users[indexOfUserWithSameLogin].login
                    ? Object.assign(user, userToCreate, { isDeleted: false })
                    : user,
            );
            return Promise.resolve(this.users[indexOfUserWithSameLogin]);
        }
        const createdUser = { ...userToCreate, id: uuidv4(), isDeleted: false };
        this.users.push(createdUser);
        return Promise.resolve(createdUser);
    }

    deleteUser(id: string): Promise<number> {
        let deletedUserCount: number;
        const indexOfUserToDelete = this.users.findIndex((user) => user.id === id);

        if (
            indexOfUserToDelete === -1 ||
            (indexOfUserToDelete !== -1 && this.users[indexOfUserToDelete].isDeleted === true)
        ) {
            deletedUserCount = 0;
        }
        this.users[indexOfUserToDelete].isDeleted = true;
        deletedUserCount = 1;
        return Promise.resolve(deletedUserCount);
    }

    updateUser(id: string, userFieldsToUpdate: UserBase): Promise<number> {
        let updatedUserCount: number;
        const indexOfUserToUpdate = this.users.findIndex((user) => user.id === id);

        if (indexOfUserToUpdate === -1 || this.users[indexOfUserToUpdate].isDeleted === true) {
            updatedUserCount = 0;
        }
        this.users.map((user) => (user.id === id ? Object.assign(user, userFieldsToUpdate) : user));
        updatedUserCount = 1;
        return Promise.resolve(updatedUserCount);
    }

    getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }): Promise<User[]> {
        const suggestedUser = this.users
            .filter((user) => user.login.includes(loginSubstring) && user.isDeleted === false)
            .sort((userLeft, userRigth) => {
                if (userLeft.login > userRigth.login) {
                    return 1;
                }
                if (userLeft.login < userRigth.login) {
                    return -1;
                }
                return 0;
            })
            .slice(0, limit);
        return Promise.resolve(suggestedUser);
    }
}
