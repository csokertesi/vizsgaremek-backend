import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { createDecipheriv, createHash } from 'crypto';

type DeviceMeasurementPayload = {
  device_id: number | string;
  pm10: number | string;
  pm4: number | string;
  pm2_5: number | string;
  pm1: number | string;
  temp: number | string;
  humidity: number | string;
  wind_speed: number | string;
  dewpoint: number | string;
  rain: number | string;
  composition?: string;
  wind_dir?: string;
  timestamp?: string;
};

@Injectable()
export class MeasurementsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

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

  async createFromEncryptedQueryParam(data: string) {
    if (!data) {
      throw new BadRequestException('Missing data query parameter');
    }

    const decryptedJson = this.decryptDevicePayload(data);
    const payload = this.parsePayload(decryptedJson);
    const measurementData = this.normalizeMeasurementPayload(payload);

    return this.prisma.$transaction(async (tx) => {
      const device = await tx.device.findUnique({
        where: { id: measurementData.device_id },
        select: { id: true },
      });

      if (!device) {
        throw new BadRequestException('Unknown device_id');
      }

      const createdMeasurement = await tx.measurement.create({ data: measurementData });

      await tx.device.update({
        where: { id: measurementData.device_id },
        data: { last_seen: createdMeasurement.timestamp },
      });

      return createdMeasurement;
    });
  }

  private decryptDevicePayload(encodedData: string): string {
    const sharedKey = this.configService.get<string>('DEVICE_INGEST_SHARED_KEY');
    if (!sharedKey) {
      throw new UnauthorizedException('Device ingest shared key is not configured');
    }

    let decodedBuffer: Buffer;
    try {
      decodedBuffer = Buffer.from(encodedData, 'base64url');
    } catch {
      throw new BadRequestException('Invalid data encoding');
    }

    if (decodedBuffer.length <= 16) {
      throw new BadRequestException('Encrypted payload is too short');
    }

    const iv = decodedBuffer.subarray(0, 16);
    const ciphertext = decodedBuffer.subarray(16);
    const key = createHash('sha256').update(sharedKey, 'utf8').digest();

    try {
      const decipher = createDecipheriv('aes-256-cbc', key, iv);
      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ]);
      return decrypted.toString('utf8');
    } catch {
      throw new UnauthorizedException('Failed to decrypt payload');
    }
  }

  private parsePayload(rawPayload: string): DeviceMeasurementPayload {
    let payload: unknown;
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      throw new BadRequestException('Decrypted payload is not valid JSON');
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new BadRequestException('Payload must be a JSON object');
    }

    return payload as DeviceMeasurementPayload;
  }

  private normalizeMeasurementPayload(payload: DeviceMeasurementPayload) {
    const requiredNumericFields: Array<keyof DeviceMeasurementPayload> = [
      'device_id',
      'pm10',
      'pm4',
      'pm2_5',
      'pm1',
      'temp',
      'humidity',
      'wind_speed',
      'dewpoint',
      'rain',
    ];

    const numericValues = requiredNumericFields.reduce<Record<string, number>>((acc, field) => {
      const value = payload[field];
      const numericValue = Number(value);

      if (!Number.isFinite(numericValue)) {
        throw new BadRequestException(`Invalid numeric field: ${String(field)}`);
      }

      acc[String(field)] = numericValue;
      return acc;
    }, {});

    let timestamp: Date | undefined;
    if (payload.timestamp !== undefined) {
      timestamp = new Date(payload.timestamp);
      if (Number.isNaN(timestamp.getTime())) {
        throw new BadRequestException('Invalid timestamp format');
      }
    }

    return {
      device_id: Math.trunc(numericValues.device_id),
      pm10: numericValues.pm10,
      pm4: numericValues.pm4,
      pm2_5: numericValues.pm2_5,
      pm1: numericValues.pm1,
      temp: numericValues.temp,
      humidity: numericValues.humidity,
      wind_speed: numericValues.wind_speed,
      dewpoint: numericValues.dewpoint,
      rain: numericValues.rain,
      composition: payload.composition,
      wind_dir: payload.wind_dir,
      ...(timestamp ? { timestamp } : {}),
    };
  }

  async exportCsv(deviceId?: number, siteId?: number, limit?: number, from?: string, to?: string): Promise<string> {
    const whereClause: any = {};
    if (deviceId) {
      whereClause.device_id = deviceId;
    }
    if (siteId) {
      whereClause.device = { site_id: siteId };
    }
    if (from || to) {
      whereClause.timestamp = {};
      if (from) whereClause.timestamp.gte = new Date(from);
      if (to) whereClause.timestamp.lte = new Date(to);
    }

    const measurements = await this.prisma.measurement.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      include: { device: true },
      ...(limit ? { take: limit } : {}),
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
