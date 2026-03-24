import { Controller, Get, Render, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('devices/:id/edit')
  @Render('device-edit')
  async editDevice(@Param('id') id: string) {
    const device = await this.prisma.device.findUnique({ where: { id: parseInt(id) } });
    return { device };
  }
}
