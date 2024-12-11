export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}

export interface UserStorage {
    userId?: number;
    userRole?: string;
}
