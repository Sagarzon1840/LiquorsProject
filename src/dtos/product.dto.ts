import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class ProductDto {
  /**
   * Es un string hasta 50 caracteres, es único y no puede ser nulo
   * @example "Ejemplo"
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Una descripción breve del producto
   * @example "ejemplo de ejemplo"
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Categoria del producto con la primera letra en mayuscula
   * @example "Whisky"
   */
  @IsNotEmpty()
  category: string;

  /**
   * Pais de donde proviene la bebida
   * @example "Escocia"
   */
  @IsNotEmpty()
  @IsString()
  country: string;

  /**
   * Marca del desarrollador de la bebida
   * @example "Johnnie Walker"
   */
  @IsNotEmpty()
  @IsString()
  brand: string;

  /**
   * Nivel de alcohol por volumen de la bebida
   * @example "40"
   */
  @IsNotEmpty()
  @IsNumber()
  abv: number;

  /**
   * Un link de una imagen del producto
   * @example "https://upload.wikimedia.org/wikipedia/commons/6/64/Ejemplo.png"
   */
  @IsNotEmpty()
  @IsUrl()
  imgUrl: string;

  /**
   * Tamaño de la botella expresada en litros
   * @example "750ml"
   */
  @IsNotEmpty()
  @IsString()
  size: string;
}
