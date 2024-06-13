import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3002);
}
bootstrap();
