import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { ProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductService {
  getAllProducts() {}
  createProduct(product: ProductDto) {}
  updateProduct(product: ProductDto) {}
  deleteProduct(id: ParseUUIDPipe) {}
}
