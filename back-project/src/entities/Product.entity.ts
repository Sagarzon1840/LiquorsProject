import { ProductDetails } from './productDetails.entity';

export class Product {
  constructor({ name, description, price, category, country, tags }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.country = country;
    this.tags = tags;
    this.id++;
  }
  id: number; //cambiar a string

  name: string;

  description: string;

  price: number;

  category: string;

  country: string;

  tags: ProductDetails;
}
