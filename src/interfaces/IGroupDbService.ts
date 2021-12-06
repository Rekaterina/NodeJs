import { DbGroup } from './IGroup';

export interface IGroupDbService {
    getDbGroup(id: string): Promise<DbGroup | null>;
}
