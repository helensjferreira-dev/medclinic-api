import { UserRepository } from '../repositories/UserRepository.js';
import type { User } from '../entities/User.js';
import type { LoginInputDto } from '../dtos/LoginInputDto.js';
import type { RegisterInputDto } from '../dtos/RegisterInputDto.js';
import type { LoginResponseDto } from '../dtos/LoginResponseDto.js';
import { AppError } from '../errors/AppError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import type { UserProfileResponseDto } from '../dtos/UserProfileResponseDto.js';

export class UserService {
    constructor(private repo: typeof UserRepository) {}

    async registerUser(dto: RegisterInputDto): Promise<User> {
        // business rule: O e-mail deve ser único
        const existingUser = await this.repo.findByEmail(dto.email);
        if (existingUser) {
            throw new AppError(`Já existe um usuário com o e-mail ${dto.email}.`, 409);
        }
        const hashedPassword = await hashPassword(dto.password);
        const newUser = this.repo.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: dto.role
        });
       return await this.repo.save(newUser);
    }
    async loginUser(dto: LoginInputDto): Promise<LoginResponseDto> {
        const user = await this.repo.findByEmail(dto.email);
        if (!user) {
            throw new AppError('E-mail e senha inválidos.', 401);
        }
        const passwordMatch = await comparePassword(dto.password, user.password);
        if (!passwordMatch) {
            throw new AppError('E-mail e senha inválidos.', 401);
        }
        const token = generateToken({
            sub: user.id,
            role: user.role
        });
        return {
            token,
            user: {
                id: user.id,
                role: user.role
            }
        };
    

}
async getUserProfile(id: string): Promise<UserProfileResponseDto> {
    const user = await this.repo.findOne({where: {id}});
    if (!user) {
        throw new AppError('Usuário não encontrado', 404);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
}
