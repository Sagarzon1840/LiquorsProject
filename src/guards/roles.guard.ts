import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'role',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Convert user.role to an array if it's not already (in case you use multiple roles in future)
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];

    const hasRole = () =>
      requiredRoles.some((role) => userRoles.includes(role));

    const valid = user && user.role && hasRole();

    if (!valid) {
      console.error('Access denied: User does not have required roles');
      throw new ForbiddenException('No access to this route');
    }
    return true;
  }
}
