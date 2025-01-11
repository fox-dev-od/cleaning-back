// orders.service.ts
import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class OrdersService {
  constructor(
    private telegramService: TelegramService,
  ) {}

  async createOrder(dto: {
    phone: string;
    subject?: string;
    notes?: string;
    from?: string;
  }) {
    // Логика сохранения заказа в БД (например, через Mongoose)
    // ...

    // Отправляем уведомление в Telegram
    await this.telegramService.sendMessage(
      dto.phone,
      dto.subject,
      dto.notes,
      dto.from,
    );

    // Возвращаем результат
    return { success: true };
  }
}
