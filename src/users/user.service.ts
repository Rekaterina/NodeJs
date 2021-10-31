import { v4 as uuidv4 } from 'uuid';

import { User, UserBase } from './user.model';

const users: User[] = [];

export function getUser(id: string): User | undefined {
    return users.find((user) => user.id === id);
}

export function createUser(userToCreate: UserBase): User | null {
    const indexOfUserWithSameLogin = users.findIndex((user) => user.login === userToCreate.login);
    if (indexOfUserWithSameLogin !== -1 && users[indexOfUserWithSameLogin].isDeleted === false) {
        return null;
    }
    if (indexOfUserWithSameLogin !== -1 && users[indexOfUserWithSameLogin].isDeleted === true) {
        users.map((user) =>
            user.login === users[indexOfUserWithSameLogin].login
                ? Object.assign(user, userToCreate, { isDeleted: false })
                : user,
        );
        return users[indexOfUserWithSameLogin];
    }
    const createdUser = { ...userToCreate, id: uuidv4(), isDeleted: false };
    users.push(createdUser);
    return createdUser;
}

export function deleteUser(id: string): User | null {
    const indexOfUserToDelete = users.findIndex((user) => user.id === id);

    if (indexOfUserToDelete === -1 || (indexOfUserToDelete !== -1 && users[indexOfUserToDelete].isDeleted === true)) {
        return null;
    }
    users[indexOfUserToDelete].isDeleted = true;
    return users[indexOfUserToDelete];
}

export function updateUser(id: string, userFieldsToUpdate: Partial<User>): User | null {
    const indexOfUserToUpdate = users.findIndex((user) => user.id === id);

    if (indexOfUserToUpdate === -1 || users[indexOfUserToUpdate].isDeleted === true) {
        return null;
    }
    users.map((user) => (user.id === id ? Object.assign(user, userFieldsToUpdate) : user));
    return users[indexOfUserToUpdate];
}

export function getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }): User[] {
    return users
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
