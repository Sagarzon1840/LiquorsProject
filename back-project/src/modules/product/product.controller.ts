import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put()
  updateProduct(@Body() product: Product) {
    return this.productsService.updateProduct(product);
  }

  @Delete(':id')
  //cambiar id a string
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
