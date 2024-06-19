import {
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
  AddFavoriteProductDTO,
  CreateUserDTO,
  LoginUsersDTO,
  RemoveFavoriteProductDTO,
  UpdateUserDTO,
} from 'src/dtos/user.dto';
import { Users } from 'src/entities/User.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Reviews } from 'src/entities/Review.entity';
import { Subscription } from 'src/entities/Subscription.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('newsletter/:id')
  async newsletter(@Param('id') userId: string) {
    const newsletter = await this.userService.newsletterBienvenida(userId);
    return newsletter;
  }

  //GET AllUser
  @Get()
  findAll(): Promise<Users[]> {
    return this.userService.findAllUser();
  }
  //GET UserID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findOneUser(id);
  }
  //GET UserID find products
  @Get(':id/products')
  async getUserProducts(@Param('id') userId: string) {
    const products = await this.userService.getUserProducts(userId);
    if (!products || products.length === 0) {
      throw new NotFoundException(
        `No se encontraron productos para el usuario con ID ${userId}`,
      );
    }
    return products;
  }
  //GET UserID find reviews
  @Get(':id/reviews')
  async getUserReviews(@Param('id') id: string): Promise<Reviews[]> {
    const user = await this.userService.getUserReviews(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user.reviews;
  }
  //GET UserID find subscription
  @Get(':id/subscription')
  async getUserSubscription(@Param('id') id: string): Promise<Subscription> {
    const user = await this.userService.getUserSubscription(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user.subscription;
  }
  // GET user/:id/favorites
  @Get(':id/favorites')
  async getUserFavorites(@Param('id') userId: string) {
    return this.userService.getUserFavorites(userId);
  }
  //PUT User
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<Users> {
    return this.userService.updateUser(id, updateUser);
  }
  // DELETE user/:id/favorites
  // DELETE user/:id/favorites
  @Delete(':id/favorites')
  @ApiBody({ type: RemoveFavoriteProductDTO })
  async removeFavoriteProducts(
    @Param('id') userId: string,
    @Body() body: RemoveFavoriteProductDTO,
  ) {
    const { productIds } = body;
    const results = await Promise.all(
      productIds.map((productId) =>
        this.userService.removeFavoriteProduct(userId, productId),
      ),
    );
    return results.join('\n');
  }

  //DELETE for UserID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.removeUser(id);
  }

  //POST User
  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() user: CreateUserDTO): Promise<Users> {
    return this.userService.createUser(user);
  }
  // POST user/:id/favorites
  @Post(':id/favorites')
  @ApiBody({ type: AddFavoriteProductDTO })
  async addFavoriteProduct(
    @Param('id') userId: string,
    @Body() body: AddFavoriteProductDTO,
  ) {
    const { products } = body;
    return this.userService.addFavoriteProduct(userId, products);
  }
  //POST signin
  @Post('signin')
  @ApiBody({ type: LoginUsersDTO })
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
