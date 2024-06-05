// import { SubscriptionType, UserRole } from 'src/entities/User.entity';

import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// import { UserRole } from 'src/enums/roles.enum';
// import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDTO {
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
    description: 'Contraseña del usuario',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'firebaseUid12345678',
    description: 'UID de Firebase del usuario',
  })
  firebaseUid?: string;

  // @ApiProperty({enum:UserRole})
  // @Column()
  // role: UserRole;
  //   subcription: SubscriptionType;
}

export class UpdateUserDTO {
  @ApiProperty({ example: 'Jorge Vega' })
  name?: string;

  @ApiProperty({ example: 'jorge@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'password' })
  password?: string;
}

export class LoginUsersDTO extends PickType(CreateUserDTO, [
  'email',
  'password',
]) {}

export class FirebaseDTO{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'firebaseToken',
    description:'Token de autenticación de Firebase',
  })
  token:string;
}