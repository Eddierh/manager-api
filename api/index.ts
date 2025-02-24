// ✅ Evitar múltiples declaraciones de variables
const path = require('path');

let server: (event: any, context: any) => any = () => null;

module.exports = async function handler(event, context) {
  if (!server) {
    const { bootstrap } = require(path.resolve(__dirname, '../dist/src/main.js'));
    server = await bootstrap();
  }
  if (server) {
    return server(event, context);
  } else {
    throw new Error('Server is not initialized');
  }
};
