import { Controller, Get, Post, Body, Query, Header, UseGuards } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @ApiOperation({ summary: 'Get recent measurements' })
  @ApiQuery({ name: 'deviceId', required: false, description: 'Filter by device ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('deviceId') deviceId?: string) {
    if (deviceId) {
      return this.measurementsService.findByDevice(+deviceId);
    }
    return this.measurementsService.findAll();
  }

  @ApiOperation({ summary: 'Submit encrypted device measurement via GET' })
  @ApiQuery({
    name: 'data',
    required: true,
    description: 'Base64url encoded encrypted payload containing IV + ciphertext',
  })
  @Get('device')
  createFromDevice(@Query('data') data: string) {
    return this.measurementsService.createFromEncryptedQueryParam(data);
  }

  @ApiOperation({ summary: 'Submit a new measurement' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        device_id: { type: 'number', example: 1 },
        pm10: { type: 'number', example: 45.2 },
        pm4: { type: 'number', example: 28.1 },
        pm2_5: { type: 'number', example: 22.0 },
        pm1: { type: 'number', example: 15.5 },
        composition: { type: 'string', example: 'Főként kipufogógáz.' },
        temp: { type: 'number', example: 18.5 },
        humidity: { type: 'number', example: 65 },
        wind_speed: { type: 'number', example: 12 },
        wind_dir: { type: 'string', example: 'ÉNy' },
        dewpoint: { type: 'number', example: 11 },
        rain: { type: 'number', example: 0 },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any) {
    return this.measurementsService.create(data);
  }

  @ApiOperation({ summary: 'Export measurements as CSV' })
  @ApiQuery({ name: 'siteId', required: false, description: 'Filter by site ID' })
  @ApiQuery({ name: 'deviceId', required: false, description: 'Filter by device ID' })
  @ApiQuery({ name: 'limit', required: false, description: 'Max number of rows to export' })
  @ApiQuery({ name: 'from', required: false, description: 'Start of timespan (ISO 8601 date)' })
  @ApiQuery({ name: 'to', required: false, description: 'End of timespan (ISO 8601 date)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('export')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="measurements.csv"')
  async exportCsv(
    @Query('siteId') siteId?: string,
    @Query('deviceId') deviceId?: string,
    @Query('limit') limit?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.measurementsService.exportCsv(
      deviceId ? +deviceId : undefined,
      siteId ? +siteId : undefined,
      limit ? +limit : undefined,
      from || undefined,
      to || undefined,
    );
  }
}
