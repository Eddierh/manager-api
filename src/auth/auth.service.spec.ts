import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  // 🔹 REGISTRAR USUARIO
  async register(username: string, password: string) {
    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) throw new ConflictException('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, password: hashedPassword });
    await this.userRepo.save(user);
    return { message: 'Usuario registrado exitosamente' };
  }

  // 🔹 INICIAR SESIÓN
  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales incorrectas');

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return { token };
  }
}
