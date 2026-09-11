import type { UserRole } from '../entities/User.js';

export interface UserProfileResponseDto {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

