export interface LoginResponse {
    jwt?: string;
    userId?: number;
    userRole?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}
