import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import createServer from '@vendia/serverless-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000); // Local execution
}

// Definir el handler para Vercel
let server;

if (process.env.IS_VERCEL) {
  const handler = async (event, context, callback) => {
    if (!server) {
      const app = await NestFactory.create(AppModule);
      app.setGlobalPrefix('api');
      await app.init();
      const expressApp = app.getHttpAdapter().getInstance();
      server = createServer(expressApp); // Crear una sola vez
    }
    return server(event, context, callback); // ✅ Pasar los 3 argumentos
  };

  module.exports = { handler }; // Exportación para Vercel
} else {
  bootstrap(); // Local execution
}
