import bcrypt from 'bcryptjs';

const { hash, compare } = bcrypt;

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function comparePassword(password: string, hashValue: string): Promise<boolean> {
    return await compare(password, hashValue);
}