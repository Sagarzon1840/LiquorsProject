import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('Bearer Token not found');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(token, { secret });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      request.user = payload;

      return true;
    } catch (error) {
      console.error('Token verification error:', error.message); // Log the error
      throw new UnauthorizedException('Invalid token');
    }
  }
}
