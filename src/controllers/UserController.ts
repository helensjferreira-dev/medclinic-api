import type { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { AppError } from '../errors/AppError.js';

const userService = new UserService(UserRepository);

export class UserController {
    // GET //users/me
    async getMe (req: Request, res: Response): Promise<void> {
        const userId = req.user?.sub;
    
        if(!userId) {
            throw new AppError('Usuário não autenticado', 401);
    }
    const profile = await userService.getUserProfile(userId);
    res.status(200).json(profile);
    }

    async adminPing (req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: 'Ping! Acesso de Administrador validado com sucesso!',
            timestamp: new Date().toISOString()

        });
    }
}
