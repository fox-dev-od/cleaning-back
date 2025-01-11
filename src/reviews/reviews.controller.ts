// reviews.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ReviewsService,
  CreateReviewDto,
  UpdateReviewDto,
} from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  // [1] Получение всех отзывов (открытый доступ)
  @Get()
  async getAll() {
    return this.reviewsService.findAll();
  }

  // [2] Создание отзыва
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(dto);
  }

  // [3] Обновление отзыва (только автор, только с токеном)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') reviewId: string,
    @Body() dto: UpdateReviewDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    if (!user?.userId) {
      throw new ForbiddenException('Не удалось определить пользователя');
    }

    return this.reviewsService.updateReview(reviewId, dto);
  }

  // [4] Удаление отзыва (только автор, только с токеном)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') reviewId: string, @Req() req: Request) {
    const user = req.user as any;
    if (!user?.userId) {
      throw new ForbiddenException('Не удалось определить пользователя');
    }

    return this.reviewsService.removeReview(reviewId);
  }
}
