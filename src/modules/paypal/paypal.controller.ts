import { Controller, Get, Post, Query, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PayPal')
@Controller('paypal')
export class PayPalController {
  constructor(private readonly paypalService: PayPalService) {}

  @Post('create-order')
  async createOrder(@Body() subscription: SubscriptionDto, @Query('userId') userId: string) {
    try {
      const order = await this.paypalService.createOrder(subscription, userId);
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('capture-order')
  async captureOrder(@Query('token') token: string, @Res() res) {
    await this.paypalService.captureOrder(token, res);
  }

  @Get('cancel-order')
  cancelOrder(@Res() res) {
    return this.paypalService.cancelOrder(res);
  }
}
