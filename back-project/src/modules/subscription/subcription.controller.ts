import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SubscriptionService } from './subcription.service';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { UpdateSubscriptionDto } from 'src/dtos/updateSubscription.dto';

@Controller('subscription')
export class SubcriptionController {
  constructor(private readonly subcriptionService: SubscriptionService) {}

  @Get()
  getSubcription() {
    return this.subcriptionService.getSubcription();
  }

  @Put(':id')
  updateSubcriptionType(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subcriptionService.updateSubcriptionType(id, updateSubscriptionDto.type, updateSubscriptionDto.status);
  }

  @Post(':id')
  createSubcriptionType(
    @Param("id",ParseUUIDPipe)id:string,
    @Body() susbcription:SubscriptionDto) {
    return this.subcriptionService.createSubcription(id,susbcription);
  }

  @Delete(':id')
  deleteSubcription(@Param("id", ParseUUIDPipe) id:string) {
    return this.subcriptionService.deleteSubcription(id);
  }
}
