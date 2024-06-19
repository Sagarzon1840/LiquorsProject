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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly jwtService: JwtService,
  ) {}

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
    const { name, email, firebaseUid, provider, profileImage } = user;
    try {
      // Buscar usuario por email
      const foundUser = await this.usersRepository.findOne({
        where: { email },
      });

      if (foundUser) {
        if (!foundUser.provider && provider) {
          foundUser.firebaseUid = firebaseUid;
          foundUser.provider = provider;
          foundUser.profileImage = profileImage;
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
        profileImage: profileImage || null,
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
