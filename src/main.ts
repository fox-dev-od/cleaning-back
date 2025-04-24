import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение CORS
  app.enableCors({
    origin: '*', // Разрешить все источники (замените * на конкретный домен для безопасности)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешённые методы
    credentials: true, // Разрешить передачу cookies, если нужно
  });

  // Запуск приложения на указанном порту
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
