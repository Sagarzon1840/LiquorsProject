// import { SubscriptionType, UserRole } from 'src/entities/User.entity';

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/enums/roles.enum';

export class CreateUserDTO {
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
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'URL de la imagen de perfil del usuario',
  })
  profileImage?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiProperty({
    enum: UserRole,
    example: UserRole.User,
    description: 'Rol del usuario',
  })
  role?: UserRole;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'firebaseUid12345678',
    description: 'UID de Firebase del usuario',
  })
  firebaseUid?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'google.com',
    description: 'Proveedor de autenticación del usuario',
  })
  provider?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Jorge Vega',
    description: 'Nombre del usuario completo',
  })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'jorge@gmail.com',
    description:
      'Correo electronico del usuario; no usar mayusculas, ni espacios',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'URL de la imagen de perfil del usuario',
  })
  profileImage?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiProperty({
    enum: UserRole,
    example: UserRole.User,
    description: 'Rol del usuario',
  })
  role?: UserRole;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'firebaseUid12345678',
    description: 'UID de Firebase del usuario',
  })
  firebaseUid?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'google.com',
    description: 'Proveedorde autenticación del usuario',
  })
  provider?: string;
}

export class LoginUsersDTO {
  @ApiProperty({ example: 'jorge@gmail.com' })
  email: string;

  @ApiProperty({ example: 'firebaseUid12345678' })
  firebaseUid: string;

  @IsString()
  @IsOptional()
  @ApiHideProperty()
  provider?: string;
}

//no se utiliza por que es el mismo campo del createUser
// export class RegisterUsersDTO {
// login devolver nombre y email y el token de la persona
//recibo email, uuid

//   @ApiProperty({ example: 'jorge@gmail.com' })
//   email: string;

//   @ApiProperty({ example: 'firebaseUid12345678' })
//   firebaseUid: string;

//   @ApiProperty({
//     example: 'google.com',
//     description: 'Proveedor de autenticación del usuario',
//   })
//   provider?: string;

export class AddFavoriteProductDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    type: [String],
    example: [
      '0a890c84-02fe-41e2-82a0-a4ce8a04fed5',
      '0a890c84-02fe-41e2-82a0-a4ce8a04fed5',
    ],
    description: 'Array de IDs de productos a agregar como favoritos',
  })
  products: string[];
}

export class RemoveFavoriteProductDTO {
  @ApiProperty({
    description: 'Array de IDs de productos a eliminar de favoritos',
    example: [
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
