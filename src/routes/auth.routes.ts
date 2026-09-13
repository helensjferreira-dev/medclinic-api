import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { RegisterInputDto } from '../dtos/RegisterInputDto.js';
import { LoginInputDto } from '../dtos/LoginInputDto.js';
import { validateDto } from '../middlewares/validateDto.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
    '/register', 
    validateDto(RegisterInputDto),
asyncHandler(authController.registerUser)
);

authRouter.post(
    '/login', 
    validateDto(LoginInputDto),
    asyncHandler(authController.loginUser)
    );

export default authRouter;