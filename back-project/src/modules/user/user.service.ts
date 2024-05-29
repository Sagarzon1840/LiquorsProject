import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
//falta implementar la logica
  create() {
    return 'creacion de usuario';
  }
  findOne(id: string) {
    return `retorno el usuario con id: ${id}`;
  }
  update(id:string){
    return `retorno el usuario actualizado con id: ${id}`;
  }
  remove(id:string){
    return `usuario eliminado con id: ${id}`;
  }
}
