import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  async getAllProducts() {
   return await this.productRepository.find()
  }

  async createProduct(product: ProductDto, id: string) {
    
   const newProduct = new Product()

    newProduct.userId =id;
    newProduct.name = product.name;
    newProduct.description = product.description
    newProduct.category = product.category
    newProduct.country = product.country
    newProduct.imgUrl = product.imgUrl
    newProduct.ABV = product.ABV
    newProduct.brand = product.brand
    newProduct.size = product.size
  
    await this.productRepository.save(newProduct)
    return newProduct
  }

  async updateProduct(id: string, product: Product) {
    await this.productRepository.update(id, product)
    const updateProduct = await this.productRepository.findOne({where:{id}})
    return updateProduct
  }

  //cambiar id a string
  async deleteProduct(id: string) {
    await this.productRepository.delete(id)
    return { message: `el producto ha sido eliminado`};
  }
}
