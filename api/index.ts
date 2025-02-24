const path = require('path');

let server: ((event: any, context: any) => Promise<any>) | null = null;

module.exports = async function handler(event: any, context: any) {
  if (!server) {
    try {
      console.log('🔄 Inicializando el servidor...');
      const { bootstrap } = require(path.resolve(__dirname, '../dist/main.js'));
      server = await bootstrap();
      console.log('✅ Servidor inicializado correctamente.');
    } catch (error) {
      console.error('❌ Error al inicializar el servidor:', error);
      throw new Error('Error al inicializar el servidor');
    }
  }

  if (server) {
    return server(event, context);
  } else {
    throw new Error('🚫 El servidor no está inicializado.');
  }
};
