export interface Role {
    id?: number;
    name?: string;
    description?: string;
}

export interface EditRoleModal {
    title: string;
    action: string
    role?: Role;
}