import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // Add token from cookie to request
        request.token = request.cookies?.token;
        return request;
    }
}
