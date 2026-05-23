import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../models/user.model';
export declare const generateToken: (payload: AuthPayload) => string;
export declare const verifyToken: (token: string) => AuthPayload | null;
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map