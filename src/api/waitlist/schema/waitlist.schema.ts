import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WaitlistDocument = HydratedDocument<Waitlist>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Waitlist {
  @Prop({
    type: String,
    required: [true, 'Email is required'],
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
