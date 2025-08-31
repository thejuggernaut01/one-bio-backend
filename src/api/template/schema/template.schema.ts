import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Style } from './style.schema';

export type TemplateDocument = HydratedDocument<Template>;

// Represents a base, reusable template that users can choose from.
// This does NOT store any user-specific data.
@Schema({ timestamps: true, versionKey: false })
export class Template {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: Style, default: () => ({}) })
  style: Style;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
