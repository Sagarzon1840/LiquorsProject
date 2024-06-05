// import { SubscriptionType, UserRole } from 'src/entities/User.entity';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
// import { UserRole } from 'src/enums/roles.enum';
// import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  // @ApiProperty()
  // @PrimaryGeneratedColumn('uuid')
  // id:string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jorge Vega',
    description: 'Nombre del usuario completo',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'jorge@gmail.com',
    description:
      'Correo electronico del usuario; no usar mayusculas, ni espacios',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ 
    example: 'password',
   description: 'Contraseña del usuario' 
  })
  password: string;

  // @ApiProperty({enum:UserRole})
  // @Column()
  // role: UserRole;

  //   subcription: SubscriptionType;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'Jorge Vega' })
  name?: string;

  @ApiProperty({ example: 'jorge@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'password' })
  password?: string;
}