import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Mantener el prefijo global
  await app.init();

  // Convertir la aplicación de NestJS en una función serverless
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

// Exportar como función por defecto para que Vercel la reconozca
export default bootstrap().then((handler) => handler);
