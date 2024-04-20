import { IsAlpha, IsNotEmpty, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;
}
