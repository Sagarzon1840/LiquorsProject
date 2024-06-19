import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, LoginUsersDTO, UpdateUserDTO } from 'src/dtos/user.dto';
import { Product } from 'src/entities/Product.entity';
import { Users } from 'src/entities/User.entity';
import { In, Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as cron from 'node-cron';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly jwtService: JwtService,
  ) {
    //Programación del newsletter a las 8 AM
    cron.schedule('0 */5 * * *', () => {
      this.sendDailyNewsletter();
    });
  }

  //---------------------Nodemailer-------------------------
  async newsletterBienvenida(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ${id} not found`);
    if (user.role !== 4)
      throw new BadRequestException(`User with ${id} has to be Premium`);
    user.newsletter = true;
    await this.usersRepository.update(id, user);

    const templateParams = {
      user_name: user.name,
      user_email: user.email,
    };

    // Configuración del transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: templateParams.user_email,
      subject: 'Bienvenida al Boletín de Liquors',
      text: `Hola, ${templateParams.user_name}, bienvenido a nuestro Boletín Informativo.
      Att: Liquors Team`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return `Correo enviado con éxito: ${info.response}`;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`${error.message}`);
    }
  }

  async newsletterAuto(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ${id} not found`);

    const templateParams = {
      user_name: user.name,
      user_email: user.email,
    };

    // Configuración del transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: templateParams.user_email,
      subject: 'Boletín Periódico de Liquors',
      text: `Hola, ${templateParams.user_name}, este es tu boletín periódico.
      Att: Liquors Team`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return `Correo enviado con éxito y usuario suscrito al boletín: ${info.response}`;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`${error.message}`);
    }
  }

  async sendDailyNewsletter() {
    const users = await this.usersRepository.find();

    for (const user of users) {
      console.log(user);
      if (user.newsletter === true) {
        console.log(user.newsletter);
        if (user.email) {
          try {
            await this.newsletterAuto(user.id);
            console.log(`Correo enviado a ${user.email}`);
          } catch (error) {
            console.error(
              `Error al enviar correo a ${user.email}: ${error.message}`,
            );
          }
        }
      } else {
        console.log(user.newsletter);
      }
    }
  }

  //---------------------Create a new user-------------------------
  async createUser(user: CreateUserDTO): Promise<Users> {
    const { email, firebaseUid, profileImage } = user;
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email ya registrado!');
    }
    const newUser = this.usersRepository.create({
      ...user,
      firebaseUid,
      profileImage,
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
  async getUserProducts(userId: string): Promise<Product[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['products_id'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no fue encontrado`);
    }

    return user.products_id;
  }

  async getUserReviews(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user;
  }

  async getUserSubscription(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user;
  }
  //get userfavorites
  async getUserFavorites(userId: string): Promise<Product[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no fue encontrado`);
    }

    return user.favorites;
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
  //---------------------addFavoriteProduct for userId
  async addFavoriteProduct(
    userId: string,
    productIds: string[],
  ): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no fue encontrado`);
    }

    user.favorites = user.favorites || [];

    const existingFavorites = user.favorites.map((favorite) => favorite.id);

    const newProductIds = productIds.filter(
      (productId) => !existingFavorites.includes(productId),
    );

    const newProducts = await this.productRepository.find({
      where: { id: In(newProductIds) },
    });

    user.favorites.push(...newProducts);

    await this.usersRepository.save(user);

    return `Productos agregados como favoritos para el usuario con ID ${userId}`;
  }
  //----------------------Remove favorites
  async removeFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no fue encontrado`);
    }

    const index = user.favorites.findIndex(
      (favorite) => favorite.id === productId,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Producto con ID ${productId} no es un favorito del usuario`,
      );
    }

    user.favorites.splice(index, 1);

    await this.usersRepository.save(user);

    return `Producto con ID ${productId} eliminado de los favoritos del usuario con ID ${userId}`;
  }
  //--------------------Remove a user by ID----------------
  async removeUser(id: string): Promise<string> {
    const predefinedEmail = 'lionel@gmail.com';
    try {
      const userToDelete = await this.usersRepository.findOne({
        where: { id },
      });

      if (!userToDelete) {
        throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
      }

      const preloadedUser = await this.usersRepository.findOne({
        where: { email: predefinedEmail },
      });

      if (!preloadedUser) {
        throw new NotFoundException(
          `Usuario de prueba con email ${predefinedEmail} no fue encontrado`,
        );
      }

      // Reasignar productos
      await this.productRepository
        .createQueryBuilder()
        .update(Product)
        .set({ seller: preloadedUser })
        .where('seller.id = :userId', { userId: id })
        .execute();

      // Eliminar usuario
      await this.usersRepository.delete(id);

      return `Usuario con ID ${id} ha sido eliminado y sus productos han sido reasignados al usuario con email ${predefinedEmail}`;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Ha ocurrido un error al eliminar el usuario y reasignar sus productos.',
      );
    }
  }
  //product Box

  async addProductToBox(userId: string, productIds: string[]): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['box'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.box = user.box || [];
    const existingProductIds = user.box.map((product) => product.id);
    const newProductIds = productIds.filter(
      (productId) => !existingProductIds.includes(productId),
    );
    const newProducts = await this.productRepository.find({
      where: { id: In(newProductIds) },
    });

    user.box.push(...newProducts);
    await this.usersRepository.save(user);

    return `Products added to user's box with ID ${userId}`;
  }

  async getUserBox(userId: string): Promise<Product[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['box'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.box;
  }

  async updateBox(userId: string, productIds: string[]): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['box'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.box = [];
    const newProducts = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    user.box.push(...newProducts);
    await this.usersRepository.save(user);

    return `User's box with ID ${userId} updated`;
  }
  async removeProductFromBox(
    userId: string,
    productIds: string[],
  ): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['box'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    productIds.forEach((productId) => {
      const index = user.box.findIndex((product) => product.id === productId);
      if (index !== -1) {
        user.box.splice(index, 1);
      }
    });

    await this.usersRepository.save(user);

    return `Products removed from user's box with ID ${userId}`;
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
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new UnauthorizedException(
          'JWT_SECRET not found in environment variables',
        );
      }
      const token = this.jwtService.sign(payload, { secret });

      return {
        message: 'Usuario exitosamente logueado!',
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        token,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Usuario no registrado');
      }
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
      // Buscar usuario por email
      const foundUser = await this.usersRepository.findOne({
        where: { email },
      });

      if (foundUser) {
        if (!foundUser.provider && provider) {
          foundUser.firebaseUid = firebaseUid;
          foundUser.provider = provider;
          await this.usersRepository.save(foundUser);

          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          };
          const secret = process.env.JWT_SECRET;
          console.log(secret);
          if (!secret) {
            throw new UnauthorizedException(
              'JWT_SECRET not found in enviroment variables',
            );
          }
          const token = this.jwtService.sign(payload);
          return {
            message: 'Proveedor agregado y usuario logueado correctamente!',
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            profileImage: foundUser.profileImage,
            role: foundUser.role,
            token,
          };
        }

        if (foundUser.provider === provider) {
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          };
          const secret = process.env.JWT_SECRET;
          if (!secret) {
            throw new UnauthorizedException(
              'JWT_SECRET not found in environment variables',
            );
          }
          const token = this.jwtService.sign(payload, { secret });

          return {
            message: 'Usuario logueado correctamente!',
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            profileImage: foundUser.profileImage,
            role: foundUser.role,
            token,
          };
        }

        throw new BadRequestException('El email ya está registrado.');
      }

      // Crear nuevo usuario si no existe
      const newUser = this.usersRepository.create({
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
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new UnauthorizedException(
          'JWT_SECRET not found in environment variables',
        );
      }
      const token = this.jwtService.sign(payload, { secret });

      return {
        message: 'Usuario registrado correctamente!',
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        profileImage: savedUser.profileImage,
        role: savedUser.role,
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
