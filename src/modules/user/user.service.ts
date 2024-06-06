import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, LoginUsersDTO, UpdateUserDTO } from 'src/dtos/user.dto';
import { Users } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
// import { User } from 'mercadopago';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  //---------------------Create a new user-------------------------
  async createUser(user: CreateUserDTO): Promise<Users> {
    const { email, firebaseUid } = user;
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email ya registrado!');
    }
    const newUser = this.usersRepository.create({
      ...user,
      firebaseUid,
    });
    return await this.usersRepository.save(newUser);
  }
  //---------------------Find a user by ID------------------------
  async findOneUser(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user;
  }
  //--------------------Find all users----------------------------
  async findAllUser(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
  //---------------------Update a user by ID---------------------
  async updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<Users> {
    const { email } = updateUserDto;
    if (email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });
      if (existingUser && existingUser.id != id) {
        throw new ConflictException('Email ya Registrado!');
      }
    }
    await this.usersRepository.update(id, updateUserDto);
    const updateUser = await this.usersRepository.findOne({ where: { id } });
    if (!updateUser) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return updateUser;
  }

  //--------------------Remove a user by ID----------------
  async removeUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
  }
  //********************LoginUsers***************************
  //--------------------User sign in-------------------------
  //email, uuidfirebase
  async signIn(login: LoginUsersDTO) {
    const { email, firebaseUid12345678 } = login;
    //find User.email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fue encontrado`,
      );
    }
    if (firebaseUid12345678!== user.firebaseUid) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    
    const payload={
      id:user.id,
      email:user.email,
      role:user.role
    }
    const token=this.jwtService.sign(payload)
    return {
      message: 'Usuario exitosamente logueado!',
      id :user.id,
      name:user.name,
      token
    };
  }
  //--------------------User sign up--------------------------
  async signUp(user: CreateUserDTO) {
    const { name, email, firebaseUid } = user;

    // find User.email
    const foundUser = await this.usersRepository.findOne({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('El email ya esta registrado.');
    }
    const newUser = await this.usersRepository.create({
      name,
      email,
      firebaseUid,
    });

    const savedUser = await this.usersRepository.save(newUser);
    
    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: `Usuario registrado correctamente!`,
      token,
    };
  }
}
