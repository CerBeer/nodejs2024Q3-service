import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('User is not authorized');
    }
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
