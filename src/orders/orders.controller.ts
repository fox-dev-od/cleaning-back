// orders.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body()
    dto: {
      phone: string;
      subject?: string;
      notes?: string;
      from?: string;
    },
  ) {
    return this.ordersService.createOrder(dto);
  }
}
