"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const userService = __importStar(require("../services/user.service"));
const getUsers = (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: 'Authentication required.' });
        return;
    }
    const users = userService.getUsers(req.user.role, req.user.id);
    res.json(users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const { userId, password, firstName, lastName, email, role, department } = req.body;
    if (!userId || !password || !firstName || !lastName || !email || !role || !department) {
        res.status(400).json({ error: 'All fields are required: userId, password, firstName, lastName, email, role, department.' });
        return;
    }
    const result = userService.createUser({ userId, password, firstName, lastName, email, role, department });
    if ('error' in result) {
        res.status(409).json(result);
        return;
    }
    res.status(201).json(result);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!id) {
        res.status(400).json({ error: 'User ID is required.' });
        return;
    }
    const result = userService.updateUserById(id, updates);
    if (!result) {
        res.status(404).json({ error: 'User not found.' });
        return;
    }
    res.json(result);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'User ID is required.' });
        return;
    }
    const success = userService.deleteUserById(id);
    if (!success) {
        res.status(404).json({ error: 'User not found.' });
        return;
    }
    res.json({ message: 'User deleted successfully.' });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map