import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  // Endpoint para probar la conexión
  @Get('test-connection')
  async testConnection(): Promise<string> {
    return this.databaseService.testConnection();
  }
}
