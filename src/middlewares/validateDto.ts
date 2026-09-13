import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js'; 

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const firstError = errors[0];

      const constraints = firstError?.constraints;
      const errorMessage = constraints 
        ? Object.values(constraints)[0] 
        : 'Erro de validação nos dados enviados.';

      throw new AppError(errorMessage || 'Erro de validação nos dados enviados.', 400);
    }

    req.body = dto;
    next();
  };
}
