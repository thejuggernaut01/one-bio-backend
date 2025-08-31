import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StyleDocument = HydratedDocument<Style>;

// Sub-document for styling options
@Schema({ timestamps: true, versionKey: false, _id: false })
export class Style {
  @Prop({ default: 'rounded' })
  buttonStyle: 'rounded' | 'pill' | 'square' | 'outline';

  @Prop({ default: false })
  buttonBorder: boolean;

  @Prop({ default: '#000000' })
  backgroundColor: string;

  @Prop({ default: '' })
  backgroundImage: string;

  @Prop({ default: '#ffffff' })
  textColor: string;

  @Prop({ default: 'Inter' })
  fontFamily: string;

  @Prop({ default: false })
  overlay: boolean;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
