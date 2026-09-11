import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { RegisterInputDto } from '../dtos/RegisterInputDto.js';
import { validateDto } from '../middlewares/validateDto.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/register', validateDto(RegisterInputDto),
asyncHandler(authController.registerUser), (req, res) => authController.registerUser(req, res));
authRouter.post('/login', (req, res) => authController.loginUser(req, res));

export default authRouter;