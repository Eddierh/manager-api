import { Injectable } from '@nestjs/common';
import * as postgres from 'postgres';

@Injectable()
export class DatabaseService {
  private sql: postgres.Sql;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL no está definida en el archivo .env');
    }

    // Usar postgres en vez de postgres()
    this.sql = postgres(connectionString);
  }

  // Método para probar la conexión
  async testConnection(): Promise<string> {
    try {
      await this.sql`SELECT 1`; // Ejecutar una consulta simple
      return 'Conexión exitosa a la base de datos';
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error de conexión: ${error.message}`;
      }
      return 'Error de conexión desconocido';
    }
  }

  // Método para cerrar la conexión
  async close() {
    await this.sql.end();
  }
}
