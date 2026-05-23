import { LoginRequest, LoginResponse, UserResponse } from '../models/user.model';
import { findUserByCredentials } from '../data/users';
import { generateToken } from '../middleware/auth.middleware';

const toUserResponse = (user: any): UserResponse => ({
  id: user.id,
  userId: user.userId,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  department: user.department,
  createdAt: user.createdAt
});

export const login = (request: LoginRequest): LoginResponse | null => {
  const user = findUserByCredentials(request.userId, request.password, request.role);
  
  if (!user) return null;

  const token = generateToken({
    id: user.id,
    userId: user.userId,
    role: user.role
  });

  return {
    token,
    user: toUserResponse(user)
  };
};
