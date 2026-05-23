"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getAllUsers = exports.findUserByUserId = exports.findUserById = exports.findUserByCredentials = void 0;
const user_model_1 = require("../models/user.model");
const uuid_1 = require("uuid");
const users = [
    {
        id: (0, uuid_1.v4)(),
        userId: 'admin',
        password: 'admin123',
        firstName: 'Sarah',
        lastName: 'Connor',
        email: 'sarah.connor@company.com',
        role: user_model_1.UserRole.Admin,
        department: 'Engineering',
        createdAt: new Date('2024-01-15').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'john.doe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        role: user_model_1.UserRole.GeneralUser,
        department: 'Marketing',
        createdAt: new Date('2024-02-20').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'jane.smith',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        role: user_model_1.UserRole.GeneralUser,
        department: 'Design',
        createdAt: new Date('2024-03-10').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'mike.admin',
        password: 'admin123',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@company.com',
        role: user_model_1.UserRole.Admin,
        department: 'IT Operations',
        createdAt: new Date('2024-03-22').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'emily.w',
        password: 'password123',
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@company.com',
        role: user_model_1.UserRole.GeneralUser,
        department: 'Sales',
        createdAt: new Date('2024-04-05').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'robert.b',
        password: 'password123',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.brown@company.com',
        role: user_model_1.UserRole.GeneralUser,
        department: 'Finance',
        createdAt: new Date('2024-05-12').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'lisa.davis',
        password: 'password123',
        firstName: 'Lisa',
        lastName: 'Davis',
        email: 'lisa.davis@company.com',
        role: user_model_1.UserRole.GeneralUser,
        department: 'HR',
        createdAt: new Date('2024-06-18').toISOString()
    },
    {
        id: (0, uuid_1.v4)(),
        userId: 'alex.admin',
        password: 'admin123',
        firstName: 'Alex',
        lastName: 'Garcia',
        email: 'alex.garcia@company.com',
        role: user_model_1.UserRole.Admin,
        department: 'Engineering',
        createdAt: new Date('2024-07-01').toISOString()
    }
];
const findUserByCredentials = (userId, password, role) => {
    return users.find((u) => u.userId === userId && u.password === password && u.role === role);
};
exports.findUserByCredentials = findUserByCredentials;
const findUserById = (id) => {
    return users.find((u) => u.id === id);
};
exports.findUserById = findUserById;
const findUserByUserId = (userId) => {
    return users.find((u) => u.userId === userId);
};
exports.findUserByUserId = findUserByUserId;
const getAllUsers = () => {
    return [...users];
};
exports.getAllUsers = getAllUsers;
const addUser = (user) => {
    users.push(user);
    return user;
};
exports.addUser = addUser;
const updateUser = (id, updates) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1)
        return undefined;
    users[index] = { ...users[index], ...updates, id: users[index].id };
    return users[index];
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1)
        return false;
    users.splice(index, 1);
    return true;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map