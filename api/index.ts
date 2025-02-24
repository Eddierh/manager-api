import { bootstrap } from 'dist/src/main';

let server: any;

export default async function handler(event: any, context: any, callback: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
}
