import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from "class-validator";
import { UserRole } from "../entities/User.js";

export class RegisterInputDto {
    @IsString({
        message: 'O campo nome deve conter um texto.'
    })
    @IsNotEmpty({
        message: 'O campo nome não pode ser vazio.'
    })
    name!: string;

    @IsEmail({}, {
        message: 'Por favor, informe um endereço de e-mail válido.'
    })
    @IsNotEmpty({
        message: 'O campo e-mail não pode ser vazio.'
    })
    email!: string;

    @IsString({ message: 'A senha informada deve ser um texto válido.' })
    @IsNotEmpty({ message: 'O campo senha não pode ser vazio.' })
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
    password!: string;

    @IsEnum(UserRole, {
        message: 'O perfil de acesso deve ser: Administrador, Atendente, Médico ou Paciente.'
    })
    @IsNotEmpty({ message: 'O campo perfil de acesso (role) não pode ser vazio.' })
    role!: UserRole;


}