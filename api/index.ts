const { bootstrap } = require('../dist/main.js');

let server: any;

module.exports = async function handler(event: any, context: any, callback: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};
