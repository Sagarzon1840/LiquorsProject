import { IsNumber, IsString } from 'class-validator';

export class SubscriptionDto {

     /**
   * Es un tipo de subcripcion para el usuario
   * @example premium
   */
    @IsString()
    type: string;

    /**
     * El precio de la subcripcion
     * @example 200
     */
    @IsNumber()
    price: number;
}
