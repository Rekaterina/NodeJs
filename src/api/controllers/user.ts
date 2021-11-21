import { UserBase } from '../../interfaces/IUser';
import { IUserService } from '../../interfaces/IUserService';

export class UserController {
    public userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    getAutoSuggestUsers({ loginSubstring, limit }: { loginSubstring: string; limit: number }) {
        return this.userService.getAutoSuggestUsers({
            loginSubstring,
            limit,
        });
    }

    getUser(userId: string) {
        return this.userService.getUser(userId);
    }

    createUser(userToCreate: UserBase) {
        return this.userService.createUser(userToCreate);
    }

    deleteUser(userId: string) {
        return this.userService.deleteUser(userId);
    }

    updateUser(userId: string, userFieldsToUpdate: UserBase) {
        return this.userService.updateUser(userId, userFieldsToUpdate);
    }
}
