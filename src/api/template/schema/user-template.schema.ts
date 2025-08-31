import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Style } from './style.schema';
import { User } from 'src/api/user/schema/user.schema';
import { Template } from './template.schema';

export type UserTemplateDocument = HydratedDocument<UserTemplate>;

// Represents a user's specific template choice and their customizations.
// This creates a one-to-one link between a User and their chosen/customized style.

@Schema({ timestamps: true })
export class UserTemplate {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Template' })
  baseTemplate?: Template; // To track which base template was originally chosen

  @Prop({ type: Style, default: () => ({}) })
  style: Style;
}

export const UserTemplateSchema = SchemaFactory.createForClass(UserTemplate);
