import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import type { TokenPayload } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
}
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError('Token não informado', 401);
}
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new AppError('Token inválido', 401);
    }
    try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
    } catch (err) {
    throw new AppError('Token inválido ou expirado', 401);
}
}
