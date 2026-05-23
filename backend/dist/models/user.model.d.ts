export declare enum UserRole {
    Admin = "Admin",
    GeneralUser = "GeneralUser"
}
export interface User {
    id: string;
    userId: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    department: string;
    createdAt: string;
}
export interface UserResponse {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    department: string;
    createdAt: string;
}
export interface LoginRequest {
    userId: string;
    password: string;
    role: UserRole;
}
export interface LoginResponse {
    token: string;
    user: UserResponse;
}
export interface CreateUserRequest {
    userId: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    department: string;
}
export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: UserRole;
    department?: string;
}
export interface AuthPayload {
    id: string;
    userId: string;
    role: UserRole;
}
//# sourceMappingURL=user.model.d.ts.map