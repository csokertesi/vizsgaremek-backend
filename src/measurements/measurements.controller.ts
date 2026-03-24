import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @ApiOperation({ summary: 'Get recent measurements' })
  @ApiQuery({ name: 'deviceId', required: false, description: 'Filter by device ID' })
  @Get()
  findAll(@Query('deviceId') deviceId?: string) {
    if (deviceId) {
      return this.measurementsService.findByDevice(+deviceId);
    }
    return this.measurementsService.findAll();
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
  @Post()
  create(@Body() data: any) {
    return this.measurementsService.create(data);
  }
}
