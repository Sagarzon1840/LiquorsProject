import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO } from 'src/dtos/user.dto';
import { Users } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

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
  async signIn(email: string, password: string) {
    //find User.email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fue encontrado`,
      );
    }
    //find User.password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new BadGatewayException('Credenciales incorrectas');

    const payload = { id: user.id, email: user.email, isAdmin: user.role };
    const token = this.jwtService.sign(payload);

    // return menssage and token
    return {
      message: 'Usuario exitosamente logueado!',
      token,
    };
  }
  //--------------------User sign up--------------------------
  async signUp(user: CreateUserDTO) {
    const { email, password } = user;
    // find User.email
    const foundUser = await this.usersRepository.findOne({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('El email ya esta registrado.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //update User.password(Hashed)
    const newUser = await this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    //return save new User
    return await this.usersRepository.save(newUser);
  }
  //-----------------User sign in with Firebase--------------------
  async signInWithFirebase(token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fue encontrado.`,
      );
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const jwtToken = this.jwtService.sign(payload);

    return {
      message: 'Usuario exitosamente logueado!',
      token: jwtToken,
    };
  }
  //-------------------User Sign Up with Firebase----------------
  async signUpWithFirebase(token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid: firebaseUid } = decodedToken;

    const foundUser = await this.usersRepository.findOne({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('El email ya está registrado.');
    }

    const newUser = this.usersRepository.create({
      email,
      firebaseUid,
    });
    return await this.usersRepository.save(newUser);
  }
}
