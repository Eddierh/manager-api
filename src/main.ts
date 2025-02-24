import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import createServer from '@vendia/serverless-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (process.env.VERCEL) {
    // ✅ Configuración para Vercel (Serverless)
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return createServer(expressApp);
  } else {
    // ✅ Configuración para entorno local
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  }
}

bootstrap();
