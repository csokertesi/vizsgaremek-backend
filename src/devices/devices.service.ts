import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.device.findMany({ include: { site: true } });
  }

  findOne(id: number) {
    return this.prisma.device.findUnique({ where: { id }, include: { site: true, measurements: true } });
  }

  create(data: any) {
    return this.prisma.device.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.device.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.device.delete({ where: { id } });
  }
}
