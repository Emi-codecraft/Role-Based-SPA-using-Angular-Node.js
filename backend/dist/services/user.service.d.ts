import { UserRole, UserResponse, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
export declare const getUsers: (requestingUserRole: UserRole, requestingUserId: string) => UserResponse[];
export declare const createUser: (request: CreateUserRequest) => UserResponse | {
    error: string;
};
export declare const updateUserById: (id: string, request: UpdateUserRequest) => UserResponse | null;
export declare const deleteUserById: (id: string) => boolean;
//# sourceMappingURL=user.service.d.ts.map