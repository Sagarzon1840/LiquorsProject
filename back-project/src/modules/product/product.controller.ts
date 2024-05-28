import {
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts() {
    this.productsService.getAllProducts();
  }

  @Post()
  createProduct(product: ProductDto) {
    this.productsService.createProduct(product);
  }

  @Put()
  updateProduct(product: ProductDto) {
    this.productsService.updateProduct(product);
  }

  @Delete()
  deleteProduct(id: ParseUUIDPipe) {
    this.productsService.deleteProduct(id);
  }
}
