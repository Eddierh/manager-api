import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  if (!server) {
    bootstrap().then(() => server(event, context, callback));
  } else {
    return server(event, context, callback);
  }
};
