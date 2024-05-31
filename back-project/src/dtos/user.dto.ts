// import { SubscriptionType, UserRole } from 'src/entities/User.entity';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  //   role: UserRole;
  //   subcription: SubscriptionType;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}
