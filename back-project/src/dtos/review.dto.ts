import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  rate: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
