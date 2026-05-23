"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const users_1 = require("../data/users");
const auth_middleware_1 = require("../middleware/auth.middleware");
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
const login = (request) => {
    const user = (0, users_1.findUserByCredentials)(request.userId, request.password, request.role);
    if (!user)
        return null;
    const token = (0, auth_middleware_1.generateToken)({
        id: user.id,
        userId: user.userId,
        role: user.role
    });
    return {
        token,
        user: toUserResponse(user)
    };
};
exports.login = login;
//# sourceMappingURL=auth.service.js.map