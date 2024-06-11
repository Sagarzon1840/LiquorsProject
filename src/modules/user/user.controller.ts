import {

  Body,
  Controller,
  Delete,
  Get,
  // NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  LoginUsersDTO,
  UpdateUserDTO
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
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.removeUser(id);
  }
  //POST signin
  @Post('signin')
  @ApiBody({ type:LoginUsersDTO })
  signIn(@Body() login: LoginUsersDTO) {
    return this.userService.signIn(login);
  }

  //POST signup
  @Post('signup')
  @ApiBody({ type: CreateUserDTO })
  signUp(@Body() user: CreateUserDTO) {
    return this.userService.signUp(user);
  }  

 
}
