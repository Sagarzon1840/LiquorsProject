import { Module } from '@nestjs/common';
import { PayPalController } from './paypal.controller';
import { PayPalService } from './paypal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../../entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';
import { TempStorage } from 'src/entities/tempStorage';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Users, TempStorage])],
  controllers: [PayPalController],
  providers: [PayPalService],
})
export class PayPalModule {}
