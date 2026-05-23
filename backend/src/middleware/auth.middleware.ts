import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../models/user.model';

// Simple token generation (no external JWT library)
const TOKEN_SECRET = 'user-management-app-secret-key-2024';

export const generateToken = (payload: AuthPayload): string => {
  const tokenData = {
    ...payload,
    exp: Date.now() + 3600000, // 1 hour
    secret: TOKEN_SECRET
  };
  return Buffer.from(JSON.stringify(tokenData)).toString('base64');
};

export const verifyToken = (token: string): AuthPayload | null => {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded.secret !== TOKEN_SECRET) return null;
    if (decoded.exp < Date.now()) return null;
    return { id: decoded.id, userId: decoded.userId, role: decoded.role };
  } catch {
    return null;
  }
};

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired token. Please login again.' });
    return;
  }

  req.user = payload;
  next();
};

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== 'Admin') {
    res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    return;
  }
  next();
};
