export interface LoginResponse {
    jwtToken?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}
