import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubscriptionDto {
  /**
   * Es un tipo de subcripcion para el usuario
   * @example premium
   */
  @IsString()
  @IsNotEmpty()
  type: string;

  /**
   * Estatus de la subscripcion, puede ser active o inactive
   * @example active
   */ 

  @IsString()
  @IsNotEmpty()
  status: string;

  /**
   * El precio de la subcripcion
   * @example 200
   */
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
