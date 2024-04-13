import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const attempt = await this.authSrv.signIn(payload);
    if (!attempt && attempt === false)
      throw new HttpException('Unauthorized!', 401);
    else if (!attempt && attempt === null)
      throw new HttpException('User not found!', 404);

    res
      .status(HttpStatus.ACCEPTED)
      .json({ message: 'Login successful!', ...attempt });
  }

  @Post('register')
  async register(@Body() payload: RegisterDto, @Res() res: Response) {
    if (payload.password !== payload.confirmPassword)
      throw new HttpException('Passwords do not match!', 400);
    const attempt = await this.authSrv.signUp(payload);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registration successful!', ...attempt });
  }
}
