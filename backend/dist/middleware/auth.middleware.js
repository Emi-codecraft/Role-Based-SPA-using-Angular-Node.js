"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.authMiddleware = exports.verifyToken = exports.generateToken = void 0;
// Simple token generation (no external JWT library)
const TOKEN_SECRET = 'user-management-app-secret-key-2024';
const generateToken = (payload) => {
    const tokenData = {
        ...payload,
        exp: Date.now() + 3600000, // 1 hour
        secret: TOKEN_SECRET
    };
    return Buffer.from(JSON.stringify(tokenData)).toString('base64');
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
        if (decoded.secret !== TOKEN_SECRET)
            return null;
        if (decoded.exp < Date.now())
            return null;
        return { id: decoded.id, userId: decoded.userId, role: decoded.role };
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    const payload = (0, exports.verifyToken)(token);
    if (!payload) {
        res.status(401).json({ error: 'Invalid or expired token. Please login again.' });
        return;
    }
    req.user = payload;
    next();
};
exports.authMiddleware = authMiddleware;
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        return;
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=auth.middleware.js.map