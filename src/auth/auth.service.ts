// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Регистрация
  async register(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const user = await this.usersService.createUser(email, password);
    return this._buildUserResponse(user);
  }

  // Логин
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Генерируем JWT
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: this._buildUserResponse(user),
    };
  }

  private _buildUserResponse(user) {
    return {
      id: user._id,
      email: user.email,
    };
  }
}
