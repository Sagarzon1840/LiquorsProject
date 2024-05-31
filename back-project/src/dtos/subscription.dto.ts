import { IsDecimal, IsString } from 'class-validator';

export class SubscriptionDto {

    @IsString()
    type: string;

    @IsDecimal()
    price: number;
}
