export interface UserBase {
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

export interface User extends UserBase {
    id: string;
}
