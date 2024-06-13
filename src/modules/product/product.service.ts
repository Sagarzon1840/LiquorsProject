import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.productRepository.find({ where: { id } });
  }

  async createProduct(product: ProductDto, id: string) {
    const newProduct = new Product();

    const user = await this.userRepository.findOneBy({ id });

    newProduct.seller = user;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.category = product.category;
    newProduct.country = product.country;
    newProduct.imgUrl = product.imgUrl;
    newProduct.abv = product.abv;
    newProduct.brand = product.brand;
    newProduct.size = product.size;
    newProduct.active = true;

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
      throw new BadRequestException(`Product with id ${id} not found`);
    const user = await this.userRepository.findOne({
      where: { id: product.seller.id },
      relations: { products_id: true },
    });

    if (!user)
      throw new BadRequestException(
        `User with id ${product.seller.id} not found`,
      );

    user.products_id = user.products_id.filter(
      (element) => element !== product,
    );
    product.seller = null;
    await this.userRepository.update(user.id, user);
    await this.productRepository.delete(product.id);
    return { message: `el producto ha sido eliminado` };
  }

  async deleteProductLogical(id: string) {
    const foundProduct = await this.productRepository.findOneBy({
      id,
    });

    if (foundProduct) {
      foundProduct.active = false;
    }

    await this.productRepository.update(id, foundProduct);

    return `Review with ${id} deleted`;
  }
}
