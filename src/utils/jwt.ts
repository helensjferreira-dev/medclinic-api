import jwt from 'jsonwebtoken';
import type { UserRole } from '../entities/User.js';

const { sign, verify } = jwt;

export interface TokenPayload {
  sub: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET || 'default-super-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export function generateToken(payload: TokenPayload): string {
  return sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  return verify(token, JWT_SECRET) as TokenPayload;
}
