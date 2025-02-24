import * as path from 'path';

let server: ((event: any, context: any) => any) | null = null;

module.exports = async function handler(event, context) {
  if (!server) {
    try {
      const { bootstrap } = await import(path.resolve(__dirname, '../dist/src/main.js'));
      server = await bootstrap();
    } catch (error) {
      console.error('Error al inicializar el servidor:', error);
      throw new Error('Error al inicializar el servidor');
    }
  }

  if (server) {
    return server(event, context);
  } else {
    throw new Error('Server is not initialized');
  }
};
