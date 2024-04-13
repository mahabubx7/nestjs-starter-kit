import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [JwtService, AuthService],
})
export class AuthModule {}
