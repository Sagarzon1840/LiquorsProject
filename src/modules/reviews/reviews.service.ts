import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';
import { Reviews } from 'src/entities/Review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from 'src/dtos/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews) private reviewRepository: Repository<Reviews>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createReview(
    idUser: string,
    idProduct: string,
    review: CreateReviewDto,
  ) {
    const user = await this.usersRepository.findOneBy({ id: idUser });
    if (!user) throw new NotFoundException(`User with id ${idUser} not found`);

    const product = await this.productRepository.findOneBy({ id: idProduct });
    if (!product) throw new NotFoundException(`Product with id ${idProduct}`);

    const newReview = new Reviews();

    try {
      newReview.comment = review.comment;
      newReview.rate = parseFloat(review.rate.toString());
      newReview.userId = user;
      newReview.productId = product;
      newReview.active = true;
      newReview.approbed = false;
    } catch (error) {
      throw new BadRequestException(`Review creation error: ${error.message}`);
    }
    const uploadReview = await this.reviewRepository.save(newReview);

    return uploadReview;
  }

  async getProductReviews(productId: string, page: number, limit: number) {
    //Buscar producto
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException(`Product with id ${productId}`);

    let reviews = await this.reviewRepository.find({
      where: { productId: { id: productId }, approbed: true, active: true },
      relations: ['userId'],
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    reviews = reviews.slice(startIndex, endIndex);

    return reviews;
  }

  async getUserReviews(userId: string, page: number, limit: number) {
    //Buscar User
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with id ${userId}`);

    let reviews = await this.reviewRepository.find({
      where: { userId: { id: userId }, approbed: true, active: true },
      relations: ['productId'],
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    reviews = reviews.slice(startIndex, endIndex);
    return reviews;
  }

  async getAllReviews(page: number, limit: number) {
    const startIndex = (page - 1) * limit;

    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.userId', 'user')
      .leftJoinAndSelect('review.productId', 'product')
      .select(['review', 'user.id', 'user.name', 'product.id', 'product.name'])
      .skip(startIndex)
      .take(limit)
      .getMany();

    return reviews;
  }

  async updateReview(id: string, review: Partial<Reviews>) {
    await this.reviewRepository.update(id, review);

    const foundReview = await this.reviewRepository.findOneBy({ id });
    if (!foundReview)
      throw new NotFoundException(`Review with id ${id} not found`);

    return foundReview;
  }

  async deleteReview(id: string) {
    const foundReview = this.reviewRepository.findOneBy({ id });
    if (foundReview) {
      (await foundReview).active = false;
      return `Review with ${id} deleted`;
    }
    throw new NotFoundException(`Review with id ${id} not found`);
  }
}
