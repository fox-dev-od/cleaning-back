// reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  // Получить все отзывы (можно оставить открытым, без авторизации)
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  // Создать отзыв (теперь только авторизованным, userId обязателен)
  async createReview(dto: CreateReviewDto): Promise<Review> {
    const review = new this.reviewModel({
      ...dto,
    });
    return review.save();
  }

  // Найти один отзыв
  async findOne(reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findById(reviewId).exec();
    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }
    return review;
  }

  // Обновить отзыв (только автор)
  async updateReview(reviewId: string, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(reviewId);

    // Обновляем поля
    if (dto.name !== undefined) review.name = dto.name;
    if (dto.text !== undefined) review.text = dto.text;
    if (dto.image !== undefined) review.image = dto.image;
    if (dto.from !== undefined) review.from = dto.from;

    return review.save();
  }

  // Удалить отзыв (только автор)
  async removeReview(reviewId: string): Promise<Review> {
    return this.reviewModel.findByIdAndDelete(reviewId);
  }
}

// DTO-примеры (можно добавить class-validator при желании)
export class CreateReviewDto {
  name: string;
  text: string;
  image?: string;
  from?: string;
}

export class UpdateReviewDto {
  name?: string;
  text?: string;
  image?: string;
  from?: string;
}
