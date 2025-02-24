const pathModule = require('path');
const pathModule = require('path');

// ✅ Definir server directamente en el objeto global sin el archivo adicional
(global as any).server = (global as any).server || null;

module.exports = async function handler(event: any, context: any) {
  if (!server) {
    try {
      const { bootstrap } = require(path.resolve(__dirname, '../dist/src/main.js')); // ✅ Ruta correcta hacia main.js
      server = await bootstrap();
    } catch (error) {
      console.error('Error inicializando el servidor:', error);
      throw new Error('Error al inicializar el servidor');
    }
  }

  if (server) {
    return server(event, context); // ✅ Invocación segura
  } else {
    throw new Error('Error al inicializar el servidor');
  }
};
