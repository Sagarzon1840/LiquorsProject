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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Límite de productos por página. Por defecto 5.',
    required: false,
  })
  @ApiParam({
    name: 'id',
    description: 'id del producto para obtener sus reviews. Por defecto 1.',
    required: true,
  })
  @Get('product')
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

  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Límite de productos por página. Por defecto 5.',
    required: false,
  })
  @ApiParam({
    name: 'id',
    description: 'id del user para obtener sus reviews. Por defecto 1.',
    required: true,
  })
  @Get('user')
  getUserReviews(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Param('id', ParseUUIDPipe) userId: string,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.reviewsService.getProductReviews(
      userId,
      pageNumber,
      limitNumber,
    );
  }
  @ApiBody({ required: false })
  @Post()
  createReview(
    @Body('id', ParseUUIDPipe) userId: string,
    productId: string,
    review: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(userId, productId, review);
  }

  @ApiParam({
    name: 'id',
    description: 'Id de la review a actualizar',
    required: true,
  })
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
