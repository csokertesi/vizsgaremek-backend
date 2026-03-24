import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all devices' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.devicesService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get device by ID (admin only)' })
  @ApiParam({ name: 'id', example: '1' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        site_id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Device XYZ' },
        status: { type: 'string', example: 'active' },
        computer_type: { type: 'string', example: 'Raspberry Pi' },
        measure_interval: { type: 'number', example: 300 },
        wifi_ssid: { type: 'string', example: 'MyWiFi' },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() data: any) {
    return this.devicesService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing device' })
  @ApiParam({ name: 'id', example: '1' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Device Name' },
        status: { type: 'string', example: 'inactive' },
        measure_interval: { type: 'number', example: 600 },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.devicesService.update(+id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a device' })
  @ApiParam({ name: 'id', example: '1' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
