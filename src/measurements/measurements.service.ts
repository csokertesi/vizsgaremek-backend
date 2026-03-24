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

  async exportCsv(deviceId?: number, siteId?: number): Promise<string> {
    const whereClause: any = {};
    if (deviceId) {
      whereClause.device_id = deviceId;
    }
    if (siteId) {
      whereClause.device = { site_id: siteId };
    }

    const measurements = await this.prisma.measurement.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      include: { device: true }
    });

    if (measurements.length === 0) {
      return 'id,device_id,site_id,timestamp,pm10,pm4,pm2_5,pm1,temp,humidity,wind_speed,wind_dir,dewpoint,rain,composition\n';
    }

    const headers = [
      'id', 'device_id', 'site_id', 'timestamp', 'pm10', 'pm4', 'pm2_5', 'pm1',
      'temp', 'humidity', 'wind_speed', 'wind_dir', 'dewpoint', 'rain', 'composition'
    ];
    
    const rows = measurements.map((m: any) => [
      m.id,
      m.device_id,
      m.device?.site_id || '',
      m.timestamp.toISOString(),
      m.pm10,
      m.pm4,
      m.pm2_5,
      m.pm1,
      m.temp,
      m.humidity,
      m.wind_speed,
      m.wind_dir || '',
      m.dewpoint,
      m.rain,
      `"${(m.composition || '').replace(/"/g, '""')}"`
    ]);

    return [
      headers.join(','),
      ...rows.map((row: any[]) => row.join(','))
    ].join('\n');
  }
}
