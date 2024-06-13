import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';
import { Reviews } from 'src/entities/Review.entity';
import { Subscription } from 'src/entities/Subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Product,Reviews, Subscription])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
