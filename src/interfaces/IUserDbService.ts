import { DbUser } from './IUser';

export interface IUserDbService {
    getDbUsersByUserIds(userIds: string[]): Promise<DbUser[]>;
}
