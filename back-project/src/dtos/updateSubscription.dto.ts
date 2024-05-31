import { IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  type: string;

  @IsString()
  status: string;
}
