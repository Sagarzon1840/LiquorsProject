import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dtos/product.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  //@ApiBearerAuth()

  @ApiQuery({ name: 'page', description: 'Pagina a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de por pagina',
    required: false,
  })
  @ApiBody({ required: false })
  @Get()
  getAllProducts(
    @Query('category') category: string = '',
    @Query('abv') abv: number = 0,
    @Query('brand') brand: string = '',
    @Query('country') country: string = '',
    @Query('size') size: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.productsService.getAllProducts(
      { category, abv, brand, country, size },
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Post(':id')
  createProduct(@Body() product: ProductDto, @Param('id') id: string) {
    return this.productsService.createProduct(product, id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
