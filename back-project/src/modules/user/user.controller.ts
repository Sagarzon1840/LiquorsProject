import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  FirebaseDTO,
  LoginUsersDTO,
  UpdateUserDTO,
} from 'src/dtos/user.dto';
import { Users } from 'src/entities/User.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //POST User
  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() user: CreateUserDTO): Promise<Users> {
    return this.userService.createUser(user);
  }
  //GET UserID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findOneUser(id);
  }
  //GET AllUser
  @Get()
  findAll(): Promise<Users[]> {
    return this.userService.findAllUser();
  }
  //PUT User
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<Users> {
    return this.userService.updateUser(id, updateUser);
  }
  //DELETE for UserID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.removeUser(id);
  }
  //POST signin
  @Post('signin')
  @ApiBody({ type: LoginUsersDTO })
  signIn(@Body() login: LoginUsersDTO) {
    const { email, password } = login;
    return this.userService.signIn(email, password);
  }
  //POST signup
  @Post('signup')
  @ApiBody({ type: CreateUserDTO })
  signUp(@Body() user: CreateUserDTO) {
    return this.userService.signUp(user);
  }

  //POST signIn_Firebase
  @Post('firebase/signIn')
  @ApiBody({ type: FirebaseDTO })
  signInWithFirebase(@Body() firebase: FirebaseDTO) {
    try {
      const { token } = firebase;
      return { message: 'Usuario exitosamente logueado!', token:token };
    } catch (error) {
      // Manejo de errores
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException('Error al iniciar sesión con Firebase');
      }
    }
  }

  //POST signUp_Firebase
  @Post('firebase/signUp')
  @ApiBody({ type: FirebaseDTO })
  signUpWithFirebase(@Body() firebase: FirebaseDTO) {
    const { token } = firebase;
    return this.userService.signUpWithFirebase(token);
  }
}
