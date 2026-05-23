import { User, UserRole } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
  {
    id: uuidv4(),
    userId: 'admin',
    password: 'admin123',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.connor@company.com',
    role: UserRole.Admin,
    department: 'Engineering',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'john.doe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    role: UserRole.GeneralUser,
    department: 'Marketing',
    createdAt: new Date('2024-02-20').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'jane.smith',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    role: UserRole.GeneralUser,
    department: 'Design',
    createdAt: new Date('2024-03-10').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'mike.admin',
    password: 'admin123',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@company.com',
    role: UserRole.Admin,
    department: 'IT Operations',
    createdAt: new Date('2024-03-22').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'emily.w',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@company.com',
    role: UserRole.GeneralUser,
    department: 'Sales',
    createdAt: new Date('2024-04-05').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'robert.b',
    password: 'password123',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@company.com',
    role: UserRole.GeneralUser,
    department: 'Finance',
    createdAt: new Date('2024-05-12').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'lisa.davis',
    password: 'password123',
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@company.com',
    role: UserRole.GeneralUser,
    department: 'HR',
    createdAt: new Date('2024-06-18').toISOString()
  },
  {
    id: uuidv4(),
    userId: 'alex.admin',
    password: 'admin123',
    firstName: 'Alex',
    lastName: 'Garcia',
    email: 'alex.garcia@company.com',
    role: UserRole.Admin,
    department: 'Engineering',
    createdAt: new Date('2024-07-01').toISOString()
  }
];

export const findUserByCredentials = (
  userId: string,
  password: string,
  role: UserRole
): User | undefined => {
  return users.find(
    (u) => u.userId === userId && u.password === password && u.role === role
  );
};

export const findUserById = (id: string): User | undefined => {
  return users.find((u) => u.id === id);
};

export const findUserByUserId = (userId: string): User | undefined => {
  return users.find((u) => u.userId === userId);
};

export const getAllUsers = (): User[] => {
  return [...users];
};

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};

export const updateUser = (id: string, updates: Partial<User>): User | undefined => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updates, id: users[index].id };
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
