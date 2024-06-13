import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  /**
   * Categoria a modificar con la primera letra en mayuscula
   * @example "Ron"
   */
  @IsOptional()
  @IsString()
  category: string = '';

  /**
   * Nivel de alcohol por volumen de la bebida a modificar
   * @example "37.5"
   */
  @IsOptional()
  @IsNumber()
  abv: number = 0;

  /**
   * Pais a modificar de donde proviene la bebida
   * @example "Puerto Rico"
   */
  @IsOptional()
  @IsString()
  country: string = '';

  /**
   * Marca a modificar del desarrollador de la bebida
   * @example "Bacardí"
   */
  @IsOptional()
  @IsString()
  brand: string = '';

  /**
   * Tamaño de la botella a modificar expresada en litros
   * @example "1L"
   */
  @IsOptional()
  @IsString()
  size: string = '';

  /**
   * Valoracion del producto
   * @example "8"
   */
  @IsOptional()
  @IsNumber()
  rate: number = 0;
}
