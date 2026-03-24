import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.site.findMany({ include: { devices: true } });
  }

  findOne(id: number) {
    return this.prisma.site.findUnique({ where: { id }, include: { devices: true, evaluations: true } });
  }

  create(data: any) {
    return this.prisma.site.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.site.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.site.delete({ where: { id } });
  }
}
