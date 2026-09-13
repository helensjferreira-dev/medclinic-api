import { AppDataSource } from '../database/data-source.js';
import { User } from '../entities/User.js';

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findByEmail(email: string): Promise<User | null> {
        return await this.findOne({ where: { email}})
    }
})