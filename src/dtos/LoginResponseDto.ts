import type { UserRole } from '../entities/User.js';

export interface LoginResponseDTO {
  token: string;
  user: {
    id: string;
    role: UserRole;
  };
}
