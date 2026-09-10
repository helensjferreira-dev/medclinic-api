import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isSSLRequired = process.env.DB_SSL === 'true';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    // Configuração dinâmica de SSL para compatibilidade com a Aiven
    ssl: isSSLRequired ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: false,
    entities: [] // PRENCHER APÓS
})