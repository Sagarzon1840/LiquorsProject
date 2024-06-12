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
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subcription.service';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { UpdateSubscriptionDto } from 'src/dtos/updateSubscription.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Subscription')
@Controller('subscription')
export class SubcriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard, AuthGuard)
  getSubcription() {
    return this.subscriptionService.getSubcription();
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard, AuthGuard)
  updateSubcriptionType(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.updateSubscriptionType(id, updateSubscriptionDto.type, updateSubscriptionDto.status);
  }

  @Post(':id')
  @ApiBearerAuth()
  @Roles(UserRole.User, UserRole.Premium)
  @UseGuards(RolesGuard, AuthGuard)
  createSubcriptionType(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() subscription: SubscriptionDto
    ) 
  {
    return this.subscriptionService.createFactura(id, subscription);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard, AuthGuard)
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

  @HttpCode(200)
  @Post()
  async paymentSuccess(@Query('data.id') dataId, @Query('type') type1,@Res() res: Response) {
    try {
      const result = await this.subscriptionService.handlePaymentSuccess(dataId, type1);
      return res.status(result.statusCode).json({ message: 'Subscription created successfully' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json(error.getResponse());
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
}
