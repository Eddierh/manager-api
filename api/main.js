const { createServer, proxy } = require('aws-serverless-express');
const { AppModule } = require('../dist/main');
const { NestFactory } = require('@nestjs/core');

let cachedServer;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return createServer(expressApp);
}

module.exports.handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
