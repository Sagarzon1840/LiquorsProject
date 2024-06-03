import { IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  /**
   * Es un tipo de subcripcion para el usuario
   * @example seller
   */
  @IsString()
  type: string;

  /**
   * Status de la subscripcion
   * @example active
   */
  @IsString()
  status: string;
}
