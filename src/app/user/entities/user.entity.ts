import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { RoleTypes, Roles } from '@config';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: Roles, default: 'user' })
  role: RoleTypes;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
