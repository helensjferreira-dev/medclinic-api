import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { UserRole } from '../entities/User.js';

const userRouter = Router();

const userController = new UserController();

userRouter.get( // METHOD
    '/me', // ROUTE
    authMiddleware, // AUTH MIDDLEWARE
    roleMiddleware(UserRole.ADMIN, UserRole.ATENDENTE, UserRole.MEDICO, UserRole.PACIENTE), // ROLE MIDDLEWARE
    asyncHandler(userController.getMe) // ASYNC HANDLER
);

userRouter.get(
    '/admin/ping', 
    authMiddleware,
    roleMiddleware(UserRole.ADMIN), 
    asyncHandler(userController.adminPing)
    );

export default userRouter;