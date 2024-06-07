import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { SubscriptionService } from './subcription.service';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { UpdateSubscriptionDto } from 'src/dtos/updateSubscription.dto';
import { Request, request } from 'express';
import { PaymentSearchData } from 'mercadopago/dist/clients/payment/search/types';

@Controller('subscription')
export class SubcriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  getSubcription() {
    return this.subscriptionService.getSubcription();
  }

  @Put(':id')
  updateSubcriptionType(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.updateSubscriptionType(id, updateSubscriptionDto.type, updateSubscriptionDto.status);
  }

  @Post(':id')
  createSubcriptionType(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() subscription: SubscriptionDto) {
    return this.subscriptionService.createFactura(id, subscription);
  }

  @Delete(':id')
  async deleteSubscription(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.subscriptionService.deleteSubscription(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async paymentSuccess(@Query('data.id') dataId: PaymentSearchData, @Query('type') type: string, @Res() res: Response) {

      await this.subscriptionService.handlePaymentSuccess(dataId, type);
      
  }
}
