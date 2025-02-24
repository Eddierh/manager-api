const path = require('path');

// ✅ Usar 'let' fuera de cualquier función evita múltiples declaraciones en compilaciones
let server;

module.exports = async function handler(event, context, callback) {
  if (!server) {
    const { bootstrap } = require(path.resolve(__dirname, '../dist/src/main.js'));
    server = await bootstrap();
  }
  return server(event, context, callback);
};
