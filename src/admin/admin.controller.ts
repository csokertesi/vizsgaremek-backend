import { Controller, Get, Render, Param, UseGuards, Patch, Body, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('devices/:id/edit')
  @Render('device-edit')
  async editDevice(@Param('id') id: string) {
    const device = await this.prisma.device.findUnique({ where: { id: parseInt(id) } });
    return { device };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current system stats for admin dashboard' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('stats')
  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const totalDevices = await this.prisma.device.count();
    const activeDevices = await this.prisma.device.count({
      where: {
        status: 'active'
      }
    });

    return {
      totalUsers,
      totalDevices,
      activeDevices
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('users')
  async getUsers() {
    // Ne adjuk vissza a jelszavakat!
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user role' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('users/:id/role')
  async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data: { role: body.role },
      select: { id: true, username: true, email: true, role: true },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.prisma.user.delete({
      where: { id: parseInt(id) },
      select: { id: true, username: true, email: true, role: true },
    });
  }
}
