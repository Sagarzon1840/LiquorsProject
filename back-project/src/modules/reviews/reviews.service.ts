import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews) private reviewRepository: Repository<Reviews>,
  ) {}

  async createReview() {}

  async getReviews(page: number, limit: number) {
    //Buscar producto
    let reviews = await this.reviewRepository.find();
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
