import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(identifier: string | undefined, pass: string): Promise<any> {
    const trimmed = identifier?.trim();
    if (!trimmed || !pass) return null;
    const user =
      (await this.prisma.user.findUnique({ where: { email: trimmed } })) ??
      (await this.prisma.user.findUnique({ where: { username: trimmed } }));
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    if (!data?.username || !data?.email || !data?.password) {
      throw new BadRequestException('username, email and password are required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || 'ADMIN',
      },
    });
    return this.login(user);
  }
}
