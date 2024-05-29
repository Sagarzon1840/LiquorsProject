import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/review.entity';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
