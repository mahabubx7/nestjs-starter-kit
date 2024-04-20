import { IUserSafe, UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RoleTypes } from '@config';
import { LoginDto, RegisterDto } from './dto';

interface SignInOrUpResponse {
  accessToken: string;
  user: IUserSafe;
}

interface JwtPayload {
  id: number;
  email: string;
  role: RoleTypes;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register user
  async signUp(registerDto: RegisterDto): Promise<SignInOrUpResponse> {
    const user = await this.userService.addNewUser(registerDto);
    const { id, email, role } = user;
    const token = await this.generateJwt({ id, email, role });
    return { user, ...token }; // return user and token
  }

  // Login user
  async signIn(loginDto: LoginDto): Promise<SignInOrUpResponse | null | false> {
    const { email, password } = loginDto;
    const user = await this.userService.fineUserByEmail(email);
    if (!user) return null; // 404 not found
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) return false; // wrong password!
    // return user and token
    const token = await this.generateJwt({
      id: user.id,
      role: user.role,
      email,
    });
    return { user, ...token };
  }

  // Verify password
  async verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
  }

  // Generate JWT token
  async generateJwt(payload: JwtPayload): Promise<{
    accessToken: string;
  }> {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h', // 1 hour :: change as needed
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
