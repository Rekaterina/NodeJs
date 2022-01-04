import * as jwt from 'jsonwebtoken';

import { IUserService } from '../interfaces/IUserService';
import { ILoginService } from '../interfaces/ILoginService';
import { CONFIG } from '../config/config';

export class LoginService implements ILoginService {
    public userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.userService.getUserByLogin!(username);

        if (!user || password !== user?.password) {
            return null;
        }
        const token = jwt.sign({ sub: user.id }, CONFIG.JWT_SECRET!, { expiresIn: CONFIG.JWT_EXPIRES_IN });
        return token;
    }
}
