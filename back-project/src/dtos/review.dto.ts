/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

function IsDecimalWithOneDigit(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDecimalWithOneDigit',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          return /^-?\d+(\.\d{1})?$/.test(value.toString());
        },
        defaultMessage(args: ValidationArguments) {
          return 'Rate must be a decimal number with at most one digit';
        },
      },
    });
  };
}

import { IsNotEmpty, IsString, Max, Min, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Rate must be a number' })
  @Min(0, { message: 'Rate must be at least 0' })
  @Max(5, { message: 'Rate must be at most 5' })
  @IsNotEmpty({ message: 'Rate is required' })
  @IsDecimalWithOneDigit({
    message: 'Rate must be a decimal number with at most one digit',
  })
  rate: number;

  @IsString({ message: 'Comment must be a string' })
  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;
}
