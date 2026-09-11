import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserRole } from '../entities/User.js';
import { AppError } from '../errors/AppError.js';

export function roleMiddleware(...rolesAllowed: UserRole[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            throw new AppError('Usuário não autenticado', 401);
        }
        if (!rolesAllowed.includes(user.role)) {
            throw new AppError('Você não tem permissão para acessar esse recurso.', 403);
        }
        return next();
    };
}