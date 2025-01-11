// src/orders/orders.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'orders' })
export class Order extends Document {
  @Prop({ required: true })
  phone: string;

  @Prop()
  subject?: string; // необязательно

  @Prop()
  notes?: string; // необязательно

  @Prop()
  from?: string; // откуда заявка, напр. 'health-clean'

  // Поля createdAt, updatedAt появятся автоматически,
  // т.к. timestamps: true
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
