import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Mantener el prefijo global
  await app.init();

  // Convertir la app de NestJS en una función serverless
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

// Exportar handler para entornos serverless (como Vercel)
export const handler = async (event: any, context: any) => {
  if (!server) {
    await bootstrap();
  }
  return server(event, context);
};
