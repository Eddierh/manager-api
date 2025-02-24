const path = require('path');
const { bootstrap } = require(path.resolve(__dirname, '../dist/main.js'));

let server;

module.exports = async function handler(event, context, callback) {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};
