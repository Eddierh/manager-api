import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  createServer from '@vendia/serverless-express'; // ✅ Importación corregida

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return createServer(expressApp); // ✅ Usar createServer directamente
}
