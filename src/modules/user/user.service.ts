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
    try {
      // Actualizar las referencias en la tabla products
      await this.usersRepository.query(
        'UPDATE products SET userId = NULL WHERE userId = $1',
        [id],
      );

      // Luego eliminar el usuario en la tabla users
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Ha ocurrido un error al eliminar el usuario.');
    }
  }
  //********************LoginUsers***************************
  //--------------------User sign in-------------------------
  //email, uuidfirebase
  async signIn(login: LoginUsersDTO) {
    const { email, firebaseUid } = login;
    try {
      //find User.email
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(
          `Usuario con email ${email} no fue encontrado`,
        );
      }
      if (firebaseUid !== user.firebaseUid) {
        throw new BadRequestException('Credenciales incorrectas');
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      return {
        message: 'Usuario exitosamente logueado!',
        id: user.id,
        role:user.role,
        token,
      };
    } catch (error) {
      // Solo captura NotFoundException y lanza un error personalizado
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Usuario no registrado');
      }

      // Deja que otros tipos de errores se propaguen sin alterarlos
      throw error;
    }
  }
  //--------------------User sign up--------------------------
  
// loguear usuario 
//usuario con o sin provider 
//si existe el mail y quiere registrar con provider(google)
//si ya esta registrado loguearse

  async signUp(user: CreateUserDTO) {
    const { name, email, firebaseUid, provider } = user;
    try {
      // find User.email
      const foundUser = await this.usersRepository.findOne({
        where: { email },
      });
      if (foundUser) {

        if (foundUser.email === email) {
          if (foundUser.provider === provider) {

            const payload = {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role,
            };
            const token = this.jwtService.sign(payload);
            return {
              message: `Usuario logueado correctamente!`,
              token,
            };

          }
          throw new BadRequestException('El email ya está registrado.');
        }
        // if (foundUser.provider === provider) {
        //   throw new BadRequestException(
        //     `El email ${email} ya está registrado con el proveedor ${provider}.`,
        //   );
        // }
      }
      //usuario se registre en varios provider pero no dos veces en alguno de los proveedores
      const newUser = await this.usersRepository.create({
        name,
        email,
        firebaseUid,
        provider: provider || null,
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
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(error);
      throw new Error('Ha ocurrido un error al registrar el usuario.');
    }
  }
}
