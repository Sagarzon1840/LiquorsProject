import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductDetails } from 'src/entities/productDetails.entity';

let allProducts: Product[] = [
  {
    id: 1,
    name: 'Whisky Johnnie Walker Black Label',
    description:
      'Whisky escocés de mezcla de 12 años, suave y con sabor a vainilla y frutas.',
    price: 45.99,
    category: 'Whisky',
    country: 'Escocia',
    tags: {
      id: '9b2e51b6-4de7-45a1-94f8-66d9f49c84d8',
      brand: 'Johnnie Walker',
      type: 'Blended Scotch Whisky',
      grade: 40,
      size: '750ml',
    },
  },
  {
    id: 2,
    name: 'Ron Bacardí Carta Blanca',
    description: 'Ron blanco clásico, ideal para cócteles y mojitos.',
    price: 19.99,
    category: 'Ron',
    country: 'Puerto Rico',
    tags: {
      id: '3c68ef7b-5e34-4c8b-bf99-1e2d2d254b2b',
      brand: 'Bacardí',
      type: 'White Rum',
      grade: 40,
      size: '1L',
    },
  },
  {
    id: 3,
    name: 'Tequila Don Julio Blanco',
    description: 'Tequila 100% agave, fresco y limpio con notas cítricas.',
    price: 49.99,
    category: 'Tequila',
    country: 'México',
    tags: {
      id: '77c2af2d-7b4f-489b-930f-384c9e7f4b5b',
      brand: 'Don Julio',
      type: 'Tequila Blanco',
      grade: 38,
      size: '750ml',
    },
  },
  {
    id: 4,
    name: 'Vodka Grey Goose',
    description: 'Vodka francés de alta calidad, destilado del mejor trigo.',
    price: 39.99,
    category: 'Vodka',
    country: 'Francia',
    tags: {
      id: 'b62d707a-63df-4e9d-b5f4-c5b08f7e7d41',
      brand: 'Grey Goose',
      type: 'Vodka',
      grade: 40,
      size: '750ml',
    },
  },
  {
    id: 5,
    name: 'Gin Bombay Sapphire',
    description:
      'Gin premium con un equilibrio perfecto de 10 ingredientes botánicos.',
    price: 34.99,
    category: 'Gin',
    country: 'Inglaterra',
    tags: {
      id: 'ea6715f6-b6a8-4bda-8454-68e8050a3b92',
      brand: 'Bombay Sapphire',
      type: 'Gin',
      grade: 40,
      size: '750ml',
    },
  },
];

@Injectable()
export class ProductService {
  async getAllProducts() {
    return allProducts;
  }

  async createProduct(product: ProductDto) {
    const { name, description, price, category, country, ...productDetails } =
      product;
    const tags = new ProductDetails(productDetails);
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      country,
      tags,
    });
    allProducts.push(newProduct);
    const resProduct: Product = allProducts.pop();
    return { message: 'producto creado', resProduct };
  }

  async updateProduct(product: Product) {
    const { id } = product;
    const index = allProducts.findIndex((element) => element.id === id);
    allProducts[index] = { ...allProducts[index], ...product };
    const isProduct = allProducts[index];
    return { message: 'update', isProduct };
  }

  //cambiar id a string
  async deleteProduct(id: number) {
    // const isProduct: Product = allProducts.find((element) => element.id === id);
    const updateProducts = allProducts.filter((element) => element.id !== id);
    console.log(updateProducts);

    allProducts = updateProducts;

    return { message: `el producto ha sido eliminado`, allProducts };
  }
}
