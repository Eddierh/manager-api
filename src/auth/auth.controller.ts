import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Logger,
  Query
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  // Registro de un nuevo usuario
  @Post('register')
  async register(
    @Body() body: {
      username: string;
      password: string;
    }
  ): Promise<{ message: string; user: { username: string } }> {
    const response = await this.authService.register(
      body.username,
      body.password
    );
    return response;
  }

  // Inicio de sesión de usuario
  @Post('login')
  async login(
    @Body() body: {
      username: string;
      password: string;
    }
  ): Promise<{ message: string; token: string }> {
    const response = await this.authService.login(
      body.username,
      body.password
    );
    return response;
  }

  // Obtener perfil del usuario autenticado
  @Get('profile')
  //@UseGuards(AuthGuard('jwt'))
  getProfile(
    @Request() req: {
      user: {
        id: number;
        username: string;
        email: string;
      };
    }
  ): {
    id: number;
    username: string;
    email: string;
  } {
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    };
  }

  // Crear una nueva tienda
  @Post('tienda/create')
  async createTienda(
    @Body() body: {
      name: string;
      userId: number;
    }
  ): Promise<{ message: string }> {
    this.logger.log(`Creando tienda: ${body.name}`);
    const response = await this.authService.createTienda(body.name, body.userId);
    return response;
  }

  // Actualizar el nombre de una tienda existente
  @Put('tienda/update/:id')
  async updateTienda(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      name: string;
    }
  ): Promise<{ message: string }> {
    const response = await this.authService.updateTienda(id, body.name);
    return response;
  }

  // Eliminar lógicamente una tienda
  @Delete('tienda/delete/:id')
  async deleteTienda(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string }> {
    const response = await this.authService.deleteTienda(id);
    return response;
  }

  // Listar todas las tiendas activas
@Get('tienda/active')
//@UseGuards(AuthGuard('jwt'))
async findAllActiveTiendas(
  @Query('userId') userId: number
): Promise<
  {
    id: number;
    name: string;
    created_at: Date;
    is_delete: boolean;
    userId: number;
  }[]
> {
  // Verifica que el userId se está recibiendo
  console.log('User ID recibido:', userId);

  // Llamada al servicio con el userId recibido
  const activeTiendas = (await this.authService.findAllActiveTiendas(userId)) as {
    id: number;
    name: string;
    created_at: Date;
    is_delete: boolean;
    userId: number;
  }[];

  return activeTiendas;
}


  // Crear un nuevo request
  @Post('request/create')
  async createRequest(
    @Body() body: {
      id_producto: number;
      id_tienda: number;
      price: number;
      userId: number;
    }
  ): Promise<{ message: string }> {
    const response = await this.authService.createRequest(
      body.id_producto,
      body.id_tienda,
      body.price,
      body.userId
    );
    return response;
  }

  // Actualizar un request existente
  @Put('request/update/:id')
  async updateRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      id_producto: number;
      id_tienda: number;
      price: number;
    }
  ): Promise<{ message: string }> {
    const response = await this.authService.updateRequest(
      id,
      body.id_producto,
      body.id_tienda,
      body.price
    );
    return response;
  }

  // Eliminar lógicamente un request
  @Delete('request/delete/:id')
  async deleteRequest(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string }> {
    const response = await this.authService.deleteRequest(id);
    return response;
  }

  // Listar todos los requests activos
  @Get('request/active')
 // @UseGuards(AuthGuard('jwt'))
  async findAllActiveRequests(
    @Query('userId') userId: number
  ): Promise<
    {
      id: number;
      id_producto: number;
      id_tienda: number;
      price: number;
      created_at: Date;
      is_delete: boolean;
      userId: number;
    }[]
  > {
    const activeRequests = (await this.authService.findAllActiveRequests(userId)) as {
      id: number;
      id_producto: number;
      id_tienda: number;
      price: number;
      created_at: Date;
      is_delete: boolean;
      userId: number;
    }[];
    return activeRequests;
  }

// CRUD de Productos
  //pretier-ignore
  // Crear un nuevo producto
  @Post('producto/create')
  async createProducto(
    @Body() body: {
      name: string;
      photo: Buffer;
      userId: number;
    }
  ): Promise<{ message: string }> {
    const response = await this.authService.createProducto(
      body.name,
      body.photo,
      body.userId
    );
    return response;
  }

  // Actualizar un producto existente
  @Put('producto/update/:id')
  async updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      name: string;
      photo: Buffer;
    }
  ): Promise<{ message: string }> {
    const response = await this.authService.updateProducto(
      id,
      body.name,
      body.photo
    );
    return response;
  }

  // Eliminar lógicamente un producto
  @Delete('producto/delete/:id')
  async deleteProducto(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string }> {
    const response = await this.authService.deleteProducto(id);
    return response;
  }

  // Listar todos los productos activos
  @Get('producto/active')
  //@UseGuards(AuthGuard('jwt'))
  async findAllActiveProductos(
    @Query('userId') userId: number
  ): Promise<
    {
      id: number;
      name: string;
      created_at: Date;
      photo: Buffer;
      is_delete: boolean;
      userId: number;
    }[]
  > {
    const activeProductos = (await this.authService.findAllActiveProductos(userId)) as {
      id: number;
      name: string;
      created_at: Date;
      photo: Buffer;
      is_delete: boolean;
      userId: number;
    }[];
    return activeProductos;
  }



}
