import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB Seed...');

  // 1. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Created Users:', { admin: adminUser.email, user: normalUser.email });

  // 2. Create Sites
  const site1 = await prisma.site.create({
    data: {
      name: 'Budapest - Belváros',
      lat: 47.4979,
      lon: 19.0402,
    },
  });

  const site2 = await prisma.site.create({
    data: {
      name: 'Veszprém',
      lat: 47.0929,
      lon: 17.9135,
    },
  });

  console.log('Created Sites:', site1.name, site2.name);

  // 3. Create Measuring Stations (Devices)
  const device1 = await prisma.device.create({
    data: {
      site_id: site1.id,
      name: 'Belváros Állomás 1',
      status: 'active',
      computer_type: 'Raspberry Pi 4',
      measure_interval: 300,
      wifi_ssid: 'PollutionNet',
    },
  });

  const device2 = await prisma.device.create({
    data: {
      site_id: site1.id,
      name: 'Belváros Állomás 2',
      status: 'active',
      computer_type: 'ESP32',
      measure_interval: 600,
    },
  });

  const device3 = await prisma.device.create({
    data: {
      site_id: site2.id,
      name: 'Veszprém Fő tér',
      status: 'active',
      computer_type: 'Raspberry Pi Zero',
      measure_interval: 300,
    },
  });

  console.log('Created Devices');

  // 4. Create Measurements
  // Couple for Device 1
  await prisma.measurement.create({
    data: {
      device_id: device1.id,
      pm10: 45.2,
      pm4: 28.1,
      pm2_5: 22.0,
      pm1: 15.5,
      composition: 'Főként kipufogógáz.',
      temp: 18.5,
      humidity: 65,
      wind_speed: 12,
      wind_dir: 'ÉNy',
      dewpoint: 11,
      rain: 0,
    },
  });

  await prisma.measurement.create({
    data: {
      device_id: device1.id,
      pm10: 48.0,
      pm4: 30.5,
      pm2_5: 24.1,
      pm1: 16.0,
      temp: 18.0,
      humidity: 66,
      wind_speed: 10,
      dewpoint: 10.5,
      rain: 0,
    },
  });

  // For Device 3
  await prisma.measurement.create({
    data: {
      device_id: device3.id,
      pm10: 25.0,
      pm4: 14.2,
      pm2_5: 11.1,
      pm1: 6.5,
      composition: 'Tiszta városi levegő.',
      temp: 16.5,
      humidity: 65,
      wind_speed: 22,
      wind_dir: 'ÉNY',
      dewpoint: 10,
      rain: 0,
    },
  });

  console.log('Created Measurements');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
