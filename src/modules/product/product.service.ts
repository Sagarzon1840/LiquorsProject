import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/dtos/filter.dto';
import { ProductDto } from 'src/dtos/product.dto';
import { Users } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllProducts(filters: FilterDto, page: number, limit: number) {
    let products = await this.productRepository.find();
    const { category, abv, brand, country, size, rate } = filters;
    if (category)
      products = products.filter((product) => product.category === category);
    if (abv) products = products.filter((product) => product.abv === abv);
    if (brand) products = products.filter((product) => product.brand === brand);
    if (country)
      products = products.filter((product) => product.country === country);
    if (size) products = products.filter((product) => product.size === size);
    if (rate) products = products.filter((product) => product.rate === rate);
    const start = (page - 1) * limit;
    const end = start + limit;
    const productsSlice = products.slice(start, end);
    return productsSlice;
  }

  async getProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { seller: true, reviewId: true, users: true },
    });
    if (!product)
      throw new NotFoundException(`Product with id:${id} not found`);
    return product;
  }

  async createProduct(product: ProductDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id:${id} not found`);

    const newProduct = new Product();

    newProduct.seller = user;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.category = product.category;
    newProduct.country = product.country;
    newProduct.imgUrl = product.imgUrl;
    newProduct.abv = product.abv;
    newProduct.brand = product.brand;
    newProduct.size = product.size;

    await this.productRepository.save(newProduct);

    return { message: 'product created' };
  }

  async updateProduct(id: string, product: ProductDto) {
    await this.productRepository.update(id, product);
    const updateProduct = await this.productRepository.findOne({
      where: { id, active: true },
    });
    return updateProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { seller: true },
    });
    if (!product)
      throw new NotFoundException(`Product with id:${id} not found`);
    const user = await this.userRepository.findOne({
      where: { id: product.seller.id },
      relations: { products_id: true },
    });

    if (!user)
      throw new NotFoundException(
        `User with id:${product.seller.id} not found`,
      );

    user.products_id = user.products_id.filter(
      (element) => element !== product,
    );
    product.seller = null;
    await this.userRepository.update(user.id, user);
    await this.productRepository.delete(product.id);
    return { message: `product is deleted` };
  }

  async deleteProductLogical(id: string) {
    const foundProduct = await this.productRepository.findOneBy({
      id,
    });

    if (!foundProduct) {
      throw new NotFoundException(`Product with id:${id} not found`);
    } else {
      foundProduct.active = false;
    }

    await this.productRepository.update(id, foundProduct);

    return `Review with id:${id} deleted`;
  }
}
