import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
