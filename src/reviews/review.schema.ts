// reviews/review.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'reviews' })
export class Review extends Document {
  @Prop({ required: true })
  name: string; // "Лера"

  @Prop({ required: true })
  text: string; // "Все супер, вы лучшие 👍"

  @Prop()
  image?: string; // "https://i.ibb.co/yq1yM4C/IMG-20240318-192720.jpg"

  @Prop()
  from?: string; // "health-clean" (может быть любое значение)

  /**
   * Ссылка на пользователя, если он авторизован.
   * Если отзыв создал гость, будет null.
   * Если хотите, чтобы редактировать/удалять мог
   * тот же гость, придётся иначе хранить "guestId".
   */
  @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
  authorId?: Types.ObjectId | null;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
export type ReviewDocument = Review & Document;
