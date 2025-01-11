// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: { email: string; password: string }) {
    const { email, password } = dto;
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    const { email, password } = dto;
    return this.authService.login(email, password);
  }
}
