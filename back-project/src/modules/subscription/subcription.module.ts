import { Module } from '@nestjs/common';
import { SubcriptionController } from './subcription.controller';
import { SubscriptionService } from './subcription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../../entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Users])],
  controllers: [SubcriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
