import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { SitesService } from './sites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('sites')
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @ApiOperation({ summary: 'Get all sites' })
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    const isAdmin = req.user?.role === 'ADMIN';
    return this.sitesService.findAll(isAdmin);
  }

  @ApiOperation({ summary: 'Get a single site by ID' })
  @ApiParam({ name: 'id', example: '1' })
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const isAdmin = req.user?.role === 'ADMIN';
    return this.sitesService.findOne(+id, isAdmin);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sitesService.update(+id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a site' })
  @ApiParam({ name: 'id', example: '1' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(+id);
  }
}
