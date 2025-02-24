const path = require('path');

// ✅ Inicialización clara de la variable server
let server: ((event: any, context: any) => Promise<any>) | null = null;

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
    throw new Error('El servidor no está inicializado');
  }
};
