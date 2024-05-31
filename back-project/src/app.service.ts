import { Injectable, OnModuleInit } from '@nestjs/common';
import * as data from '../../back-project/src/utils/products.json';
// import * as user from '../../utils/ecommerce-user.json';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
// import { Users } from './entities/User.entity';

@Injectable()
export class AppService implements OnModuleInit{

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, 
  // @InjectRepository(Users) private usersRepository: Repository<Users>
){}

  async onModuleInit() {
    this.getHello();
    // const products = await this.productRepository.find();
    // if (products && products.length === 0) {
    //   await this.addProductSeeder();
    // }

  }

  getHello(): string {
    return 'Hello World!';
  }
  // async addProductSeeder() {
            
  //   for (const product of data) {
     
  //     const newTags = new Tags();
  //     newTags.brand = product.tags.brand;
  //     newTags.country = product.tags.country;
  //     newTags.size = product.tags.size;
 
  //     const newProduct = new Product();
  //     newProduct.name = product.name;
  //     newProduct.description = product.description;
  //     newProduct.imgUrl = product.imgUrl;
  //     newProduct.category = product.category;
  //     newProduct.tags = newTags
  
  //     await this.productRepository
  //       .createQueryBuilder()
  //       .insert()
  //       .into(Product)
  //       .values(newProduct)
  //       .orUpdate(['description', 'name','category', 'imgUrl'])
  //       .execute();
  //   }
  //   return { message: 'Productos cargados exitosamente'}
  // }

}
