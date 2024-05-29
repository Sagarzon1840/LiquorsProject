export class ProductDetails {
  constructor({ brand, type, grade, size }) {
    this.brand = brand;
    this.type = type;
    this.grade = grade;
    this.size = size;
  }
  id: string;

  brand: string;

  type: string;

  grade: number;

  size: string;
}
