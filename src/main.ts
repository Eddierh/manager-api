import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000); // Asegúrate de escuchar en el puerto que Vercel asigna
}
bootstrap();
