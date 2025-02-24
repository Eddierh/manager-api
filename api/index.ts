let server: any;

export default async function handler(event: any, context: any, callback: any) {
  if (!server) {
    const isProd = process.env.NODE_ENV === 'production';
    const path = isProd ? './main.js' : '../dist/main.js'; // Cambiar la ruta según el entorno

    const { bootstrap } = await import(path);
    server = await bootstrap();
  }
  return server(event, context, callback);
}
