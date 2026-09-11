import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/users',userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
.then(
    () => {
        console.log('Aiven PostgreSQL Database connection established successfully.')
    app.listen(PORT, () => {
        console.log(`MedClinic API running on http://localhost:${PORT}`);
    })
}) .catch ((err) => {
    console.log('Error connecting to database:', err);
})
