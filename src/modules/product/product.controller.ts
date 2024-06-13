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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dtos/product.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';

@ApiTags('Productos')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @ApiQuery({ name: 'page', description: 'Pagina a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de por pagina',
    required: false,
  })
  @ApiQuery({ name: 'category', description: 'Categoria', required: false })
  @ApiQuery({
    name: 'abv',
    description: 'Nivel de alcohol medido en volumen',
    required: false,
  })
  @ApiQuery({ name: 'brand', description: 'Empresa', required: false })
  @ApiQuery({ name: 'country', description: 'Ciudad', required: false })
  @ApiQuery({
    name: 'size',
    description: 'Tamaño de la botella',
    required: false,
  })
  @ApiQuery({ name: 'rate', description: 'Rate del producto', required: false })
  @Get()
  getAllProducts(
    @Query('category') category: string = '',
    @Query('abv') abv: number = 0,
    @Query('brand') brand: string = '',
    @Query('country') country: string = '',
    @Query('size') size: string = '',
    @Query('rate') rate: number = 0,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    abv = Number(abv);
    rate = Number(rate);
    return this.productsService.getAllProducts(
      { category, abv, brand, country, size, rate },
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiBearerAuth()
  // @Roles(UserRole.Seller, UserRole.Admin)
  // @UseGuards(AuthGuard)
  @Post(':id')
  createProduct(@Body() product: ProductDto, @Param('id') id: string) {
    return this.productsService.createProduct(product, id);
  }

  @ApiBearerAuth()
  // @Roles(UserRole.Seller, UserRole.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productsService.updateProduct(id, product);
  }

  @ApiBearerAuth()
  // @Roles(UserRole.Seller, UserRole.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
