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
  getProductReviews(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Param('id', ParseUUIDPipe) productId: string,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.reviewsService.getProductReviews(
      productId,
      pageNumber,
      limitNumber,
    );
  }

  @Post()
  createReview(
    @Body('id', ParseUUIDPipe) userId: string,
    productId: string,
    review: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(userId, productId, review);
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
