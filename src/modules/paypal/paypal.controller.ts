import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    Res,
  } from '@nestjs/common';
  import { PayPalService } from './paypal.service';
  import { SubscriptionDto } from 'src/dtos/subscription.dto';
  import { UpdateSubscriptionDto } from 'src/dtos/updateSubscription.dto';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('PayPal')
  @Controller('paypal')
  export class PayPalController {
    constructor(private readonly paypalService: PayPalService) {}

    @Get('create-order')
    createOrder(){
        return this.paypalService.createOrder();
    }

    @Get('capture-order')
    captureOrder(){
        return this.paypalService.captureOrder();
    }

    @Get('cancel-order')
    cancelOrder(){
        return this.paypalService.cancelOrder();
    }

  }