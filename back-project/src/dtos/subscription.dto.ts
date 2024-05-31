import { IsNumber, IsString } from 'class-validator';

export class SubscriptionDto {
    @IsString()
    type: string;

    @IsNumber()
    price: number;
}
