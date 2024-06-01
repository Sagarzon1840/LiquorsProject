// import { SubscriptionType, UserRole } from 'src/entities/User.entity';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:'Jorge Vega'})
  name: string;

  @IsEmail()
  @ApiProperty({example:'JorgeV@gmail.com'})
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({example:'admin'})
  password: string;
  
  //   role: UserRole;
  //   subcription: SubscriptionType;
}

export class UpdateUserDto {
  @ApiProperty({example:'Jorge Vega'})
  name?: string;
  @ApiProperty({example:'JorgeV@gmail.com'})
  email?: string;
  @ApiProperty({example:'admin'})
  password?: string;
}
