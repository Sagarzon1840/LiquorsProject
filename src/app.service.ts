import { Injectable, OnModuleInit } from '@nestjs/common';
import * as data from './utils/products.json';
import * as user from './utils/users.json';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { Users } from './entities/User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async onModuleInit() {
    this.getHello();
    const userName = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (!userName) {
      await this.addUserSeeder();
    }

    const products = await this.productRepository.find();
    if (products && products.length === 0) {
      await this.addProductSeeder();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  async addUserSeeder() {
    // const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.usersRepository.save({ ...user});
  }

  async addProductSeeder() {
    const user = await this.usersRepository.findOne({
      where: { email: 'jane.doe@example.com' },
    });

    for (const product of data) {
      const newProduct = new Product();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.imgUrl = product.imgUrl;
      newProduct.category = product.category;
      newProduct.abv = product.abv; // Asegúrate de que el DTO y la entidad coincidan
      newProduct.brand = product.brand;
      newProduct.country = product.country;
      newProduct.size = product.size;
      newProduct.seller = user;

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(newProduct)
        .onConflict(
          `("id") DO UPDATE SET "description" = EXCLUDED.description, "name" = EXCLUDED.name, "category" = EXCLUDED.category, "imgUrl" = EXCLUDED."imgUrl", "abv" = EXCLUDED.abv, "brand" = EXCLUDED.brand, "country" = EXCLUDED.country, "size" = EXCLUDED.size`,
        )
        .execute();
    }
    return { message: 'Productos cargados exitosamente' };
  }
}
