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
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/review.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  //Un administrador tiene que aprobar la review para ser publicada totalmente

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
  @Get('product/:id')
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
  @Get('user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUserReviews(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Param('id', ParseUUIDPipe) userId: string,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.reviewsService.getUserReviews(userId, pageNumber, limitNumber);
  }

  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Límite de productos por página',
    required: false,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get()
  getAllReviews(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.reviewsService.getAllReviews(pageNumber, limitNumber);
  }

  //Solo user y premium pueden crear reviews
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Premium)
  @Post()
  createReview(
    @Query('userId', ParseUUIDPipe) userId: string,
    @Query('productId', ParseUUIDPipe)
    productId: string,
    @Body() review: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(userId, productId, review);
  }

  @ApiParam({
    name: 'id',
    description: 'Id de la review a actualizar',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Premium)
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

  @ApiParam({
    name: 'id',
    description: 'Id de la review a eliminar',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Premium, UserRole.Admin)
  @Put('delete/:id')
  deleteReview(@Param('id', ParseUUIDPipe) id: string) {
    const foundReview = this.reviewsService.deleteReview(id);
    if (!foundReview)
      throw new NotFoundException(`Review with id ${id} not found`);
    return foundReview;
  }
}
