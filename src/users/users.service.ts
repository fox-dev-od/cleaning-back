// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    // Хешируем пароль перед сохранением
    const hash = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      email,
      password: hash,
    });
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
