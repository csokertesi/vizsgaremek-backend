import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB Seed...');

  // --- KRITIKUS TÖRLÉSI SORREND (Foreign Key hiba elkerülése) ---
  await prisma.measurement.deleteMany({});
  await prisma.device.deleteMany({});
  await prisma.site.deleteMany({});
  // -----------------------------------------------------------

  // 1. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: adminPassword, role: 'ADMIN' },
  });

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: { email: 'user@example.com', password: userPassword, role: 'USER' },
  });

  // 2. Create Sites (20 magyar város pontos koordinátákkal)
  const site1 = await prisma.site.create({ data: { name: 'Budapest', lat: 47.4979, lon: 19.0402 } });
  const site2 = await prisma.site.create({ data: { name: 'Debrecen', lat: 47.5316, lon: 21.6273 } });
  const site3 = await prisma.site.create({ data: { name: 'Szeged', lat: 46.2530, lon: 20.1414 } });
  const site4 = await prisma.site.create({ data: { name: 'Miskolc', lat: 48.1035, lon: 20.7784 } });
  const site5 = await prisma.site.create({ data: { name: 'Pécs', lat: 46.0727, lon: 18.2323 } });
  const site6 = await prisma.site.create({ data: { name: 'Győr', lat: 47.6875, lon: 17.6504 } });
  const site7 = await prisma.site.create({ data: { name: 'Nyíregyháza', lat: 47.9554, lon: 21.7167 } });
  const site8 = await prisma.site.create({ data: { name: 'Kecskemét', lat: 46.8964, lon: 19.6897 } });
  const site9 = await prisma.site.create({ data: { name: 'Székesfehérvár', lat: 47.1860, lon: 18.4221 } });
  const site10 = await prisma.site.create({ data: { name: 'Szombathely', lat: 47.2307, lon: 16.6218 } });
  const site11 = await prisma.site.create({ data: { name: 'Szolnok', lat: 47.1750, lon: 20.1833 } });
  const site12 = await prisma.site.create({ data: { name: 'Tatabánya', lat: 47.5875, lon: 18.4089 } });
  const site13 = await prisma.site.create({ data: { name: 'Kaposvár', lat: 46.3594, lon: 17.7968 } });
  const site14 = await prisma.site.create({ data: { name: 'Érd', lat: 47.3775, lon: 18.9142 } });
  const site15 = await prisma.site.create({ data: { name: 'Veszprém', lat: 47.0929, lon: 17.9135 } });
  const site16 = await prisma.site.create({ data: { name: 'Békéscsaba', lat: 46.6795, lon: 21.0911 } });
  const site17 = await prisma.site.create({ data: { name: 'Zalaegerszeg', lat: 46.8417, lon: 16.8417 } });
  const site18 = await prisma.site.create({ data: { name: 'Sopron', lat: 47.6833, lon: 16.5833 } });
  const site19 = await prisma.site.create({ data: { name: 'Eger', lat: 47.9025, lon: 20.3772 } });
  const site20 = await prisma.site.create({ data: { name: 'Nagykanizsa', lat: 46.4583, lon: 16.9917 } });

  console.log('20 Sites created.');

  // 3. Create Measuring Stations (2 Devices per Site)
  const device1 = await prisma.device.create({ data: { site_id: site1.id, name: 'Budapest-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device2 = await prisma.device.create({ data: { site_id: site1.id, name: 'Budapest-02', status: 'active', computer_type: 'ESP32' } });
  const device3 = await prisma.device.create({ data: { site_id: site2.id, name: 'Debrecen-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device4 = await prisma.device.create({ data: { site_id: site2.id, name: 'Debrecen-02', status: 'active', computer_type: 'ESP32' } });
  const device5 = await prisma.device.create({ data: { site_id: site3.id, name: 'Szeged-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device6 = await prisma.device.create({ data: { site_id: site3.id, name: 'Szeged-02', status: 'active', computer_type: 'ESP32' } });
  const device7 = await prisma.device.create({ data: { site_id: site4.id, name: 'Miskolc-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device8 = await prisma.device.create({ data: { site_id: site4.id, name: 'Miskolc-02', status: 'active', computer_type: 'ESP32' } });
  const device9 = await prisma.device.create({ data: { site_id: site5.id, name: 'Pécs-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device10 = await prisma.device.create({ data: { site_id: site5.id, name: 'Pécs-02', status: 'active', computer_type: 'ESP32' } });
  const device11 = await prisma.device.create({ data: { site_id: site6.id, name: 'Győr-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device12 = await prisma.device.create({ data: { site_id: site6.id, name: 'Győr-02', status: 'active', computer_type: 'ESP32' } });
  const device13 = await prisma.device.create({ data: { site_id: site7.id, name: 'Nyíregyháza-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device14 = await prisma.device.create({ data: { site_id: site7.id, name: 'Nyíregyháza-02', status: 'active', computer_type: 'ESP32' } });
  const device15 = await prisma.device.create({ data: { site_id: site8.id, name: 'Kecskemét-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device16 = await prisma.device.create({ data: { site_id: site8.id, name: 'Kecskemét-02', status: 'active', computer_type: 'ESP32' } });
  const device17 = await prisma.device.create({ data: { site_id: site9.id, name: 'Székesfehérvár-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device18 = await prisma.device.create({ data: { site_id: site9.id, name: 'Székesfehérvár-02', status: 'active', computer_type: 'ESP32' } });
  const device19 = await prisma.device.create({ data: { site_id: site10.id, name: 'Szombathely-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device20 = await prisma.device.create({ data: { site_id: site10.id, name: 'Szombathely-02', status: 'active', computer_type: 'ESP32' } });
  const device21 = await prisma.device.create({ data: { site_id: site11.id, name: 'Szolnok-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device22 = await prisma.device.create({ data: { site_id: site11.id, name: 'Szolnok-02', status: 'active', computer_type: 'ESP32' } });
  const device23 = await prisma.device.create({ data: { site_id: site12.id, name: 'Tatabánya-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device24 = await prisma.device.create({ data: { site_id: site12.id, name: 'Tatabánya-02', status: 'active', computer_type: 'ESP32' } });
  const device25 = await prisma.device.create({ data: { site_id: site13.id, name: 'Kaposvár-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device26 = await prisma.device.create({ data: { site_id: site13.id, name: 'Kaposvár-02', status: 'active', computer_type: 'ESP32' } });
  const device27 = await prisma.device.create({ data: { site_id: site14.id, name: 'Érd-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device28 = await prisma.device.create({ data: { site_id: site14.id, name: 'Érd-02', status: 'active', computer_type: 'ESP32' } });
  const device29 = await prisma.device.create({ data: { site_id: site15.id, name: 'Veszprém-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device30 = await prisma.device.create({ data: { site_id: site15.id, name: 'Veszprém-02', status: 'active', computer_type: 'ESP32' } });
  const device31 = await prisma.device.create({ data: { site_id: site16.id, name: 'Békéscsaba-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device32 = await prisma.device.create({ data: { site_id: site16.id, name: 'Békéscsaba-02', status: 'active', computer_type: 'ESP32' } });
  const device33 = await prisma.device.create({ data: { site_id: site17.id, name: 'Zalaegerszeg-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device34 = await prisma.device.create({ data: { site_id: site17.id, name: 'Zalaegerszeg-02', status: 'active', computer_type: 'ESP32' } });
  const device35 = await prisma.device.create({ data: { site_id: site18.id, name: 'Sopron-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device36 = await prisma.device.create({ data: { site_id: site18.id, name: 'Sopron-02', status: 'active', computer_type: 'ESP32' } });
  const device37 = await prisma.device.create({ data: { site_id: site19.id, name: 'Eger-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device38 = await prisma.device.create({ data: { site_id: site19.id, name: 'Eger-02', status: 'active', computer_type: 'ESP32' } });
  const device39 = await prisma.device.create({ data: { site_id: site20.id, name: 'Nagykanizsa-01', status: 'active', computer_type: 'Raspberry Pi 4' } });
  const device40 = await prisma.device.create({ data: { site_id: site20.id, name: 'Nagykanizsa-02', status: 'active', computer_type: 'ESP32' } });

  console.log('40 Devices created.');

  // 4. Create Measurements (kerekítve)
  const allDevices = [
    device1, device2, device3, device4, device5, device6, device7, device8, device9, device10,
    device11, device12, device13, device14, device15, device16, device17, device18, device19, device20,
    device21, device22, device23, device24, device25, device26, device27, device28, device29, device30,
    device31, device32, device33, device34, device35, device36, device37, device38, device39, device40
  ];

  for (const dev of allDevices) {
    for (let i = 0; i < 3; i++) {
      await prisma.measurement.create({
        data: {
          device_id: dev.id,
          timestamp: new Date(Date.now() - i * 3600000),
          pm10: parseFloat((15 + Math.random() * 30).toFixed(1)),
          pm4: parseFloat((10 + Math.random() * 15).toFixed(1)),
          pm2_5: parseFloat((5 + Math.random() * 10).toFixed(1)),
          pm1: parseFloat((2 + Math.random() * 5).toFixed(1)),
          temp: parseFloat((15 + Math.random() * 10).toFixed(1)),
          humidity: parseFloat((40 + Math.random() * 40).toFixed(1)),
          wind_speed: parseFloat((Math.random() * 25).toFixed(1)),
          dewpoint: parseFloat((5 + Math.random() * 5).toFixed(1)),
          rain: parseFloat((Math.random() > 0.8 ? Math.random() * 2 : 0).toFixed(1)),
          wind_dir: ['É', 'D', 'K', 'NY', 'ÉNY', 'DK'][Math.floor(Math.random() * 6)],
          composition: 'Városi szálló por.',
        },
      });
    }
  }

  console.log('Seed completed: 2 Users, 20 Sites, 40 Devices, 120 Measurements created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });