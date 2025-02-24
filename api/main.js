import { bootstrap } from '../src/main';

export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}
