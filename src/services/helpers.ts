import { v4 as uuidv4 } from 'uuid';

export function getRandomUsers(amount: number) {
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
