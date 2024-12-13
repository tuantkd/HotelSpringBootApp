export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}

export interface UserStorage {
    user?: User;
    userRoles?: Array<string>;
    userPermissions?: Array<string>;
}

export interface UserTable extends User{
    roles?: Array<string>;
    permissions?: Array<string>;
}