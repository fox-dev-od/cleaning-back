// orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService, TelegramService],
})
export class OrdersModule {}
