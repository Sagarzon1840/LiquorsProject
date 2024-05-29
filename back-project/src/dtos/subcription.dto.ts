import { IsDecimal, IsString } from 'class-validator';

export class SubcriptionDto {

    @IsString()
    type: string;
  
    @IsString()
    status: "active" | "inactive";
  
    @IsDecimal()
    price: number;
}
