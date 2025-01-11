// telegram.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private bot: Telegraf;

  private readonly token: string;
  private readonly chatId: string;

  constructor(private configService: ConfigService) {
    // Считываем переменные окружения из .env
    this.token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

    // Инициализируем Telegraf
    this.bot = new Telegraf(this.token);
    // Если нужен режим long polling (слушать сообщения), можно вызвать:
    // this.bot.launch();
  }

  public async sendMessage(
    phone: string,
    subject?: string,
    notes?: string,
    from?: string
  ) {
    // Формируем текст сообщения
    const newMessage = `NEW ORDER!
Phone: ${phone}
Subject: ${subject}
Message: ${notes}
From: ${from}`;

    try {
      // Отправляем сообщение
      await this.bot.telegram.sendMessage(this.chatId, newMessage);
      this.logger.log('Telegram message sent!');
    } catch (error) {
      this.logger.error('Error sending Telegram message:', error);
    }
  }
}
