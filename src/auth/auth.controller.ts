import { Controller, Post, Body, UnauthorizedException, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'Login user',
    description:
      'Send `identifier` (email or username) and `password`.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['password'],
      properties: {
        identifier: {
          type: 'string',
          example: 'admin@example.com',
          description: 'User email or username',
        },
        email: {
          type: 'string',
          example: 'admin@example.com',
          description: 'Deprecated: same as identifier when identifier is omitted',
        },
        password: { type: 'string', example: 'admin123' },
      },
    },
  })
  @Post('login')
  async login(@Body() body) {
    const identifier = body.identifier ?? body.email;
    const user = await this.authService.validateUser(identifier, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'newuser' },
        email: { type: 'string', example: 'newuser@example.com' },
        password: { type: 'string', example: 'secret123' },
        role: { type: 'string', example: 'USER' },
      },
    },
  })
  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { password, ...user } = req.user;
    return user;
  }
}
