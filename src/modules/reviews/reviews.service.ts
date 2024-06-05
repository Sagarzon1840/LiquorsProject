import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';
import { Reviews } from 'src/entities/Review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews) private reviewRepository: Repository<Reviews>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createReview(
    userId: string,
    productId: string,
    review: Partial<Reviews>,
  ) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException(`Product with id ${productId}`);

    const newReview = new Reviews();
    newReview.comment = review.comment;
    newReview.rate = review.rate;
    newReview.userId = review.userId;
    newReview.productId = review.productId;

    const uploadReview = await this.reviewRepository.save(newReview);

    return uploadReview;
  }

  async getProductReviews(productId: string, page: number, limit: number) {
    //Buscar producto
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException(`Product with id ${productId}`);

    let reviews = await this.reviewRepository.find({
      where: { id: product.id },
      relations: { userId: true },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    reviews = reviews.slice(startIndex, endIndex);

    return reviews;
  }

  async getUserReviews(userId: string, page: number, limit: number) {
    //Buscar User
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Product with id ${userId}`);

    let reviews = await this.reviewRepository.find({
      where: { id: user.id },
      relations: { productId: true },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    reviews = reviews.slice(startIndex, endIndex);

    return reviews;
  }

  async updateReview(id: string, review: Partial<Reviews>) {
    await this.reviewRepository.update(id, review);

    const foundReview = await this.reviewRepository.findOneBy({ id });
    if (!foundReview)
      throw new NotFoundException(`Product with id ${id} not found`);

    return foundReview;
  }

  async deleteReview(id: string) {
    const foundReview = this.reviewRepository.findOneBy({ id });
    if (foundReview) {
      await this.reviewRepository.delete({ id });
      return id;
    }
    throw new NotFoundException(`Product with id ${id} not found`);
  }
}
