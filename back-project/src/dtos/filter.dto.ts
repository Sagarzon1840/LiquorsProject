import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  category: string = '';
  @IsOptional()
  @IsNumber()
  abv: number = 0;
  @IsOptional()
  @IsString()
  brand: string = '';
  @IsOptional()
  @IsString()
  country: string = '';
  @IsOptional()
  @IsString()
  size: string = '';
}
