import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WelcomeController } from './welcome.controller'; // ✅ Importar el nuevo controlador

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Cargar variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Solo en desarrollo
      ssl: {
        rejectUnauthorized: false, // ✅ Necesario para conexiones seguras en plataformas como Supabase
      },
    }),
    AuthModule,
  ],
  controllers: [WelcomeController], // ✅ Registrar el controlador
})
export class AppModule {}