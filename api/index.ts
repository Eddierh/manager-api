const path = require('path');

let server;

module.exports = async function handler(event, context) {
  if (!server) {
    const { bootstrap } = require(path.resolve(__dirname, '../dist/src/main.js'));
    server = await bootstrap();
  }
  return server(event, context);
};
