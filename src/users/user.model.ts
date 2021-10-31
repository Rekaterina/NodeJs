export interface UserBase {
    login: string;
    password: string;
    age: number;
}

export interface User extends UserBase {
    id: string;
    isDeleted: boolean;
}
