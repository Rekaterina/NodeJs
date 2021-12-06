import { v4 as uuidv4 } from 'uuid';
import { Group, Permission } from '../interfaces/IGroup';
import { User } from '../interfaces/IUser';

export function getRandomUsers(amount: number): User[] {
    let age = 20;
    let number = 1;
    const users = [];

    while (number <= amount) {
        users.push({ id: uuidv4(), login: `user${number}`, password: `password${number}`, age });
        number++;
        age++;
    }

    return users;
}

export function getRandomGroups(amount: number): Group[] {
    let number = 1;
    const groups = [];
    const permissions = Object.values(Permission);

    while (number <= amount) {
        groups.push({ id: uuidv4(), name: `group${number}`, permissions: permissions.slice(0, number) });
        number++;
    }

    return groups;
}
