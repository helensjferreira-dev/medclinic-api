import type { UserRole } from '../entities/User.js';

export interface LoginResponseDto {
  token: string;
  user: {
    id: string;
    role: UserRole;
  };
}
