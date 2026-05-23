import { User, UserRole, UserResponse, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { getAllUsers, findUserById, findUserByUserId, addUser, updateUser as updateUserInDb, deleteUser as deleteUserFromDb } from '../data/users';
import { v4 as uuidv4 } from 'uuid';

const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  userId: user.userId,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  department: user.department,
  createdAt: user.createdAt
});

export const getUsers = (requestingUserRole: UserRole, requestingUserId: string): UserResponse[] => {
  if (requestingUserRole === UserRole.Admin) {
    return getAllUsers().map(toUserResponse);
  }
  // General user can only see their own record
  const allUsers = getAllUsers();
  const ownRecord = allUsers.find(u => u.id === requestingUserId);
  return ownRecord ? [toUserResponse(ownRecord)] : [];
};

export const createUser = (request: CreateUserRequest): UserResponse | { error: string } => {
  // Check if userId already exists
  const existing = findUserByUserId(request.userId);
  if (existing) {
    return { error: `User with ID '${request.userId}' already exists.` };
  }

  const newUser: User = {
    id: uuidv4(),
    userId: request.userId,
    password: request.password,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role,
    department: request.department,
    createdAt: new Date().toISOString()
  };

  addUser(newUser);
  return toUserResponse(newUser);
};

export const updateUserById = (id: string, request: UpdateUserRequest): UserResponse | null => {
  const user = findUserById(id);
  if (!user) return null;

  const updated = updateUserInDb(id, request);
  return updated ? toUserResponse(updated) : null;
};

export const deleteUserById = (id: string): boolean => {
  return deleteUserFromDb(id);
};
