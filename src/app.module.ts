import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SitesModule } from './sites/sites.module';
import { DevicesModule } from './devices/devices.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, SitesModule, DevicesModule, MeasurementsModule, EvaluationsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
