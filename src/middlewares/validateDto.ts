import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js'; 

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!dtoClass) {
      return next(new AppError('Erro interno: Contrato de validação (DTO) não pôde ser carregado.', 500));
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new AppError('O corpo da requisição (JSON) não foi fornecido ou está vazio.', 400));
    }

    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const firstError = errors[0];

      const constraints = firstError?.constraints;
      const errorMessage = constraints 
        ? Object.values(constraints)[0] 
        : 'Erro de validação nos dados enviados.';

       return next(new AppError(errorMessage || 'Erro de validação nos dados enviados.', 400));
    }

    req.body = dto;
    return next();
  };
}
