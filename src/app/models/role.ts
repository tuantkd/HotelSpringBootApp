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

export interface PaginationRoles {
    roles?: Array<Role>;
    totalElements?: number;
    totalPages?: number;
    totalAll?: number;
}