import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enums/roles.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
