import { IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  /**
   * Es un tipo de subcripcion para el usuario
   * @example seller
   */
  @IsString()
  @IsOptional()
  type: string;

  /**
   * Status de la subscripcion
   * @example active
   */
  @IsString()
  @IsOptional()
  status: string;
}
