import type { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import { UserRepository } from '../repositories/UserRepository.js';

const userService = new UserService(UserRepository);

export class AuthController {

    async registerUser (req: Request, res: Response): Promise<void> {
        const savedUser = await userService.registerUser(req.body);
        res.status(201).json({
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role
        });
    }


    async loginUser (req: Request, res: Response): Promise<void> {
        const loginData = await userService.loginUser(req.body);
        res.status(200).json(loginData);
    }
}