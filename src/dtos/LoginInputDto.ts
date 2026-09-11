import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsEmail({}, { message: 'Por favor, informe um formato de e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório para realizar o login.' })
  email!: string;

  @IsString({ message: 'A senha deve ser um texto válido.' })
  @IsNotEmpty({ message: 'A senha é obrigatória para realizar o login.' })
  password!: string;
}
