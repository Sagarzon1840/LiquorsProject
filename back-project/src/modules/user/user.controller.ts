import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
//import { CreateUserDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create() {
    return this.userService.create();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  update(@Param(':id') id: string) {
    return this.userService.update(id);
  }
  @Delete(':id')
  remove(@Param(':id') id: string) {
    return this.userService.remove(id);
  }
}
