import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, enum: ['verify_email', 'reset_password'] })
  purpose: 'verify_email' | 'reset_password';

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: null })
  usedAt?: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
