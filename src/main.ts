import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Usar el puerto proporcionado por Vercel
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
