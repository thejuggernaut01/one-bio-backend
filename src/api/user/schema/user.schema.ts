import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BUSINESS_CATEGORY, PLATFORMS, PROFILE_GOAL } from '../enum';

export type UserDocument = HydratedDocument<User>;

class PersonalLink {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  image?: string;

  @Prop({ default: false })
  isVisible: boolean;
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name should not be less than 2 characters'],
    maxlength: [20, 'Name should not be more than 20 characters'],
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    // required: [true, 'Username is required'],
    minlength: [3, 'Username should not be less than 3 characters'],
    maxlength: [30, 'Username should not be more than 15 characters'],
    unique: true,
    trim: true,
    lowercase: true,
    // default: function () {
    //   return this.email;
    // },
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    maxlength: [160, 'Bio should not be more than 160 characters'],
    trim: true,
    default: '',
  })
  bio: string;

  @Prop({
    type: String,
    maxlength: [50, 'Location should not be more than 50 characters'],
    trim: true,
    default: '',
  })
  location: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  profileImageUrl: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    type: String,
    enum: Object.values(PROFILE_GOAL),
    default: null,
  })
  profileGoal: PROFILE_GOAL | null;

  @Prop({
    type: String,
    enum: Object.values(BUSINESS_CATEGORY),
    default: null,
  })
  businessCategory: BUSINESS_CATEGORY | null;

  @Prop({
    type: [String],
    enum: Object.values(PLATFORMS),
    default: [],
  })
  platforms: PLATFORMS[];

  @Prop({ type: [PersonalLink], default: [] })
  personalLinks: PersonalLink[];
}

export const UserSchema = SchemaFactory.createForClass(User);
