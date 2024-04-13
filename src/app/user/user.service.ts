import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUserSafe extends Omit<User, 'password'> {} // Omit password from User object

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOneUser(id: number): Promise<IUserSafe | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return null;
    delete user.password;
    return user;
  }

  // Note: To check user's password, you must use it to have the password hash
  async fineUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async addNewUser(user: CreateUserDto): Promise<IUserSafe> {
    return (await this.userRepo.save(user)) satisfies IUserSafe;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<IUserSafe | null> {
    const updated = await this.userRepo.update(+id, user);
    if (updated.affected === 1) return await this.findOneUser(+id);
    else return null;
  }
}
