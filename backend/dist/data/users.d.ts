import { User, UserRole } from '../models/user.model';
export declare const findUserByCredentials: (userId: string, password: string, role: UserRole) => User | undefined;
export declare const findUserById: (id: string) => User | undefined;
export declare const findUserByUserId: (userId: string) => User | undefined;
export declare const getAllUsers: () => User[];
export declare const addUser: (user: User) => User;
export declare const updateUser: (id: string, updates: Partial<User>) => User | undefined;
export declare const deleteUser: (id: string) => boolean;
//# sourceMappingURL=users.d.ts.map