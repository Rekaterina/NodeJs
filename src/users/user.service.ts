import { v4 as uuidv4 } from 'uuid';

import { User, UserBase } from './user.model';

export class UserService {
    static users: User[] = [];

    static getUser(id: string): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    static createUser(userToCreate: UserBase): User | null {
        const indexOfUserWithSameLogin = this.users.findIndex((user) => user.login === userToCreate.login);
        if (indexOfUserWithSameLogin !== -1 && this.users[indexOfUserWithSameLogin].isDeleted === false) {
            return null;
        }
        if (indexOfUserWithSameLogin !== -1 && this.users[indexOfUserWithSameLogin].isDeleted === true) {
            this.users.map((user) =>
                user.login === this.users[indexOfUserWithSameLogin].login
                    ? Object.assign(user, userToCreate, { isDeleted: false })
                    : user,
            );
            return this.users[indexOfUserWithSameLogin];
        }
        const createdUser = { ...userToCreate, id: uuidv4(), isDeleted: false };
        this.users.push(createdUser);
        return createdUser;
    }

    static deleteUser(id: string): User | null {
        const indexOfUserToDelete = this.users.findIndex((user) => user.id === id);

        if (
            indexOfUserToDelete === -1 ||
            (indexOfUserToDelete !== -1 && this.users[indexOfUserToDelete].isDeleted === true)
        ) {
            return null;
        }
        this.users[indexOfUserToDelete].isDeleted = true;
        return this.users[indexOfUserToDelete];
    }

    static updateUser(id: string, userFieldsToUpdate: Partial<User>): User | null {
        const indexOfUserToUpdate = this.users.findIndex((user) => user.id === id);

        if (indexOfUserToUpdate === -1 || this.users[indexOfUserToUpdate].isDeleted === true) {
            return null;
        }
        this.users.map((user) => (user.id === id ? Object.assign(user, userFieldsToUpdate) : user));
        return this.users[indexOfUserToUpdate];
    }

    static getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }): User[] {
        return this.users
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
    }
}
