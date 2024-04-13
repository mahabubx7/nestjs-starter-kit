import { Equals, IsAlpha, IsNotEmpty, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @Equals('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
