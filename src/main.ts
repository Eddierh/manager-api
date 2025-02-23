import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Define un prefijo global para la API
  await app.listen(process.env.PORT || 3000);
  console.log(app.getHttpServer()._events.request._router.stack.map(r => r.route?.path));

}
bootstrap();
