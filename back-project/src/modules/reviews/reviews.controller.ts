import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getReviews(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.reviewsService.getReviews(pageNumber, limitNumber);
  }

  @Post()
  createReview() {
    return this.reviewsService.createReview();
  }

  @Put(':id')
  updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() review: CreateReviewDto,
  ) {
    const foundReview = this.reviewsService.updateReview(id, review);
    if (!foundReview)
      throw new NotFoundException(`Review with id ${id} not found`);
    return foundReview;
  }
}
