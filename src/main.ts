import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverlessExpress } from '@vendia/serverless-express'; // ✅ Importación nombrada correcta

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // ✅ Solo escuchar localmente si NO estamos en Vercel
  if (!process.env.IS_VERCEL) {
    await app.listen(process.env.PORT || 3001); // Cambiar puerto para evitar conflictos
  }
}

// Definir el handler para Vercel
let server;

export const handler = async (event, context, callback) => {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    server = serverlessExpress({ app: expressApp }); // ✅ Uso correcto con exportación nombrada
  }
  return server(event, context, callback);
};

// ✅ Solo ejecutar bootstrap localmente
if (!process.env.IS_VERCEL) {
  bootstrap();
}
