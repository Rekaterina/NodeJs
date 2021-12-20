export interface ILoginService {
    login(username: string, password: string): Promise<string | null>;
}
