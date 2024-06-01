import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { FilterDto } from 'src/dtos/filter.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts(
    @Body() filters?: FilterDto,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    if (filters)
      this.productsService.filterProducts(filters, Number(page), Number(limit));
    return this.productsService.getAllProducts(Number(page), Number(limit));
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    this.productsService.getProduct(id);
  }

  @Post(':id')
  createProduct(@Body() product: ProductDto, @Param('id') id: string) {
    return this.productsService.createProduct(product, id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  //cambiar id a string
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
