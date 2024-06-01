import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({example: 'Whisky Johnnie Walker'})
  name: string;

  description: string;

  category: string;

  country: string;

  brand: string;

  abv: number;

  imgUrl: string;

  size: string;
}
