import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Rate must be a number' })
  @Min(0, { message: 'Rate must be at least 0' })
  @Max(5, { message: 'Rate must be at most 5' })
  @IsNotEmpty({ message: 'Rate is required' })
  @ApiProperty({
    example: '4.5'
  })
  rate: number;

  @IsString({ message: 'Comment must be a string' })
  @IsNotEmpty({ message: 'Comment is required' })
  @ApiProperty({
    example: 'Muy rico y saborizado'
  })
  comment: string;
}
