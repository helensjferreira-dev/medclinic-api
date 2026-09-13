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
        return next(new AppError('Token não informado', 401));
}
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return next(new AppError('Token inválido', 401));
    }
    try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
    } catch (err) {
    return next(new AppError('Token inválido ou expirado', 401));
}
}
