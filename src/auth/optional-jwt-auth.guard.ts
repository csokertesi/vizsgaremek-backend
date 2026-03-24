import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.token = request.cookies?.token;
    return request;
  }

  handleRequest(err: any, user: any) {
    // Don't throw on missing/invalid token, just return null
    return user || null;
  }
}
