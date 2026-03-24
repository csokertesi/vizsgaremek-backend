import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.measurement.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }

  findByDevice(deviceId: number) {
    return this.prisma.measurement.findMany({
      where: { device_id: deviceId },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });
  }

  create(data: any) {
    return this.prisma.measurement.create({ data });
  }
}
