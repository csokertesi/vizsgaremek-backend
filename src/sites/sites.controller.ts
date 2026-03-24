import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SitesService } from './sites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('sites')
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @ApiOperation({ summary: 'Get all sites' })
  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @ApiOperation({ summary: 'Get a single site by ID' })
  @ApiParam({ name: 'id', example: '1' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new site' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'New Site 1' },
        lat: { type: 'number', example: 47.123 },
        lon: { type: 'number', example: 19.456 },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any) {
    return this.sitesService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing site' })
  @ApiParam({ name: 'id', example: '1' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Site 1' },
        lat: { type: 'number', example: 47.123 },
        lon: { type: 'number', example: 19.456 },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sitesService.update(+id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a site' })
  @ApiParam({ name: 'id', example: '1' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(+id);
  }
}
