import { Controller, Get } from '@nestjs/common';

@Controller()
export class WelcomeController {
  @Get()
  getWelcomeMessage(): string {
    return '🚀 La API está funcionando correctamente en Vercel!';
  }
}
