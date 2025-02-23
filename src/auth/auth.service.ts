import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService
  ) {}
  /* prettier-ignore-file */
  // prettier-ignore
  // Registro de un nuevo usuario con hash de contraseña
  async register(username: string, password: string) {
    const existingUser: { id: number; username: string; password: string }[] =
      await this.dataSource.query('SELECT * FROM "user" WHERE username = $1', [
        username
      ]);

    if (existingUser.length > 0)
      throw new ConflictException('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.dataSource.query(
      'INSERT INTO "user" (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    return {
      message: 'Registro exitoso',
      user: {
        username
      }
    };
  }
  /* prettier-ignore-file */
  // prettier-ignore
  // Autenticación de usuario con validación de contraseña y generación de token JWT
  async login(username: string, password: string) {
    const user: { id: number; username: string; password: string }[] =
      await this.dataSource.query(
        'SELECT * FROM "user" WHERE username = $1',
        [username]
      );

    if (user.length === 0)
      throw new NotFoundException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid)
      throw new ConflictException('Credenciales incorrectas');

    const token = this.jwtService.sign({
      id: user[0].id,
      username: user[0].username
    });

    return {
      message: 'Inicio de sesión exitoso',
      token
    };
  }

  // Creación de una tienda
  async createTienda(name: string, userId: number) {
    await this.dataSource.query(
      'INSERT INTO "Tiendas" (name, created_at, is_delete, user_id) VALUES ($1, NOW(), $2, $3)',
      [name, false, userId]
    );
    return { message: 'Tienda creada exitosamente', userId };
  }

  // Actualización del nombre de una tienda existente
  async updateTienda(id: number, name: string) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "Tiendas" SET name = $1 WHERE id = $2 AND is_delete = false',
      [name, id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Tienda no encontrada o eliminada');
    return { message: 'Tienda actualizada correctamente' };
  }
  /* prettier-ignore-file */
  // prettier-ignore
  // Eliminación lógica de una tienda
  async deleteTienda(id: number) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "Tiendas" SET is_delete = true WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Tienda no encontrada');
    return { message: 'Tienda eliminada lógicamente' };
  }

  // Obtener todas las tiendas activas (no eliminadas)
  async findAllActiveTiendas(userId: number) {
    return await this.dataSource.query(
      'SELECT * FROM "Tiendas" WHERE is_delete = false AND user_id = $1',
      [userId]
    );
  }

  // CRUD de Requests

  // Crear un request
  async createRequest(id_producto: number, id_tienda: number, price: number, userId: number) {
    await this.dataSource.query(
      'INSERT INTO "request" (id_producto, id_tienda, price, created_at, is_delete, user_id) VALUES ($1, $2, $3, NOW(), $4, $5)',
      [id_producto, id_tienda, price, false, userId]
    );
    return { message: 'Request creado exitosamente' };
  }
  /* prettier-ignore-file */
  // prettier-ignore
  // Modificar un request existente
  async updateRequest(id: number, id_producto: number, id_tienda: number, price: number) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "request" SET id_producto = $1, id_tienda = $2, price = $3 WHERE id = $4 AND is_delete = false',
      [id_producto, id_tienda, price, id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Request no encontrado o eliminado');
    return { message: 'Request actualizado correctamente' };
  }
  /* prettier-ignore-file */
  // prettier-ignore
  // Eliminar lógicamente un request
  async deleteRequest(id: number) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "request" SET is_delete = true WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Request no encontrado');
    return { message: 'Request eliminado lógicamente' };
  }

  // Obtener todos los requests activos (no eliminados)
  async findAllActiveRequests(userId: number) {
    return await this.dataSource.query(
      'SELECT * FROM "request" WHERE is_delete = false AND user_id = $1',
      [userId]
    );
  }

  // CRUD de Productos

  // Crear un producto
  async createProducto(name: string, photo: Buffer, userId: number) {
    await this.dataSource.query(
      'INSERT INTO "Productos" (name, created_at, photo, is_delete, user_id) VALUES ($1, NOW(), $2, $3, $4)',
      [name, photo, false, userId]
    );
    return { message: 'Producto creado exitosamente' };
  }

  // Modificar un producto existente
  async updateProducto(id: number, name: string, photo: Buffer) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "Productos" SET name = $1, photo = $2 WHERE id = $3 AND is_delete = false',
      [name, photo, id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Producto no encontrado o eliminado');
    return { message: 'Producto actualizado correctamente' };
  }

  // Eliminar lógicamente un producto
  async deleteProducto(id: number) {
    const result: { rowCount: number } = await this.dataSource.query(
      'UPDATE "Productos" SET is_delete = true WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0)
      throw new NotFoundException('Producto no encontrado');
    return { message: 'Producto eliminado lógicamente' };
  }

  // Obtener todos los productos activos (no eliminados)
  async findAllActiveProductos(userId: number) {
    return await this.dataSource.query(
      'SELECT * FROM "Productos" WHERE is_delete = false AND user_id = $1',
      [userId]
    );
  }
}
