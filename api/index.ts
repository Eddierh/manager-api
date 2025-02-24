const pathModule = require('path');

// ✅ Definir server directamente en el objeto global sin el archivo adicional
(global as any).server = (global as any).server || null;

module.exports = async function handler(event, context, callback) {
  if (!(global as any).server) {
    // Importación corregida del handler
    const bootstrapHandler = require(pathModule.resolve(__dirname, '../dist/src/main.js')).handler;
    (global as any).server = await bootstrapHandler();
  }

  if ((global as any).server) {
    return (global as any).server(event, context, callback);
  } else {
    throw new Error('Error al inicializar el servidor');
  }
};
