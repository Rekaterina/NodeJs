import { ILoginService } from '../../interfaces/ILoginService';

export class LoginController {
    public loginService: ILoginService;

    constructor(loginService: ILoginService) {
        this.loginService = loginService;
    }

    login(username: string, password: string): Promise<string | null> {
        return this.loginService.login(username, password);
    }
}
