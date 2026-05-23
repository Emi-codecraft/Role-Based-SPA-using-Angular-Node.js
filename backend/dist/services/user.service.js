"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const users_1 = require("../data/users");
const uuid_1 = require("uuid");
const toUserResponse = (user) => ({
    id: user.id,
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    department: user.department,
    createdAt: user.createdAt
});
const getUsers = (requestingUserRole, requestingUserId) => {
    if (requestingUserRole === user_model_1.UserRole.Admin) {
        return (0, users_1.getAllUsers)().map(toUserResponse);
    }
    // General user can only see their own record
    const allUsers = (0, users_1.getAllUsers)();
    const ownRecord = allUsers.find(u => u.id === requestingUserId);
    return ownRecord ? [toUserResponse(ownRecord)] : [];
};
exports.getUsers = getUsers;
const createUser = (request) => {
    // Check if userId already exists
    const existing = (0, users_1.findUserByUserId)(request.userId);
    if (existing) {
        return { error: `User with ID '${request.userId}' already exists.` };
    }
    const newUser = {
        id: (0, uuid_1.v4)(),
        userId: request.userId,
        password: request.password,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        role: request.role,
        department: request.department,
        createdAt: new Date().toISOString()
    };
    (0, users_1.addUser)(newUser);
    return toUserResponse(newUser);
};
exports.createUser = createUser;
const updateUserById = (id, request) => {
    const user = (0, users_1.findUserById)(id);
    if (!user)
        return null;
    const updated = (0, users_1.updateUser)(id, request);
    return updated ? toUserResponse(updated) : null;
};
exports.updateUserById = updateUserById;
const deleteUserById = (id) => {
    return (0, users_1.deleteUser)(id);
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user.service.js.map