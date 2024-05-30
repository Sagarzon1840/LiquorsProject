import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/review.entity';
import { ReviewsService } from './reviews.service';
import { Product } from 'src/entities/product.entity';
import { Users } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews, Product, Users])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
