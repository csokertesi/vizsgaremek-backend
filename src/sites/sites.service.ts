import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) { }

  findAll(includeDevices = false) {
    return this.prisma.site.findMany({ include: { devices: includeDevices } });
  }

  findOne(id: number, includeDevices = false) {
    return this.prisma.site.findUnique({ where: { id }, include: { devices: includeDevices, evaluations: true } });
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

  async getDashboardData() {
    const sites = await this.prisma.site.findMany({
      include: {
        devices: {
          include: {
            measurements: {
              orderBy: { timestamp: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    return sites.map((site) => {
      const siteDevices = site.devices.map((d) => {
        let status = 'inactive';
        if (['active', 'inactive', 'maintenance'].includes(d.status)) {
          status = d.status;
        }

        return {
          id: d.id.toString(),
          name: d.name || `Eszköz ${d.id}`,
          location: site.name || `Helyszín ${site.id}`,
          status,
          lastSeen: d.last_seen
            ? new Date(d.last_seen).toLocaleString('sv-SE').replace('T', ' ')
            : '-',
          measurements: d.measurements || [],
        };
      });

      let latestMeasurement: any = {};
      const allMeasurements = site.devices
        .flatMap((d) => d.measurements || [])
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      if (allMeasurements.length > 0) {
        latestMeasurement = allMeasurements[0];
      }

      return {
        id: site.id.toString(),
        name: site.name || `Helyszín ${site.id}`,
        lat: site.lat ?? 47.4979,
        lon: site.lon ?? 19.0402,
        airQuality: {
          pm10: latestMeasurement.pm10 ?? 'Nincs adat',
          pm4: latestMeasurement.pm4 ?? 'Nincs adat',
          pm2_5: latestMeasurement.pm2_5 ?? 'Nincs adat',
          pm1: latestMeasurement.pm1 ?? 'Nincs adat',
          composition: latestMeasurement.composition || 'Nincs adat',
        },
        weather: {
          temp: latestMeasurement.temp ?? 'Nincs adat',
          humidity: latestMeasurement.humidity ?? 'Nincs adat',
          windSpeed: latestMeasurement.wind_speed ?? 'Nincs adat',
          windDir: latestMeasurement.wind_dir || 'Nincs adat',
          dewpoint: latestMeasurement.dewpoint ?? 'Nincs adat',
          rain: latestMeasurement.rain ?? 'Nincs adat',
        },
        devices: siteDevices,
      };
    });
  }
}
