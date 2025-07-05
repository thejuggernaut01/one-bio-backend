import {
  IsOptional,
  IsString,
  Length,
  IsUrl,
  IsEnum,
  IsArray,
} from 'class-validator';
import { PROFILE_GOAL, BUSINESS_CATEGORY, PLATFORMS } from '../enum/index';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 20, { message: 'Name must be between 2 and 20 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 15, { message: 'Username must be between 3 and 15 characters' })
  username?: string;

  @IsOptional()
  @IsString()
  @Length(0, 160, { message: 'Bio must not exceed 160 characters' })
  bio?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50, { message: 'Location must not exceed 50 characters' })
  location?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Profile image URL must be a valid URL' })
  profileImageUrl?: string;

  @IsOptional()
  @IsEnum(PROFILE_GOAL, { message: 'Invalid profile goal' })
  profileGoal?: PROFILE_GOAL | null;

  @IsOptional()
  @IsEnum(BUSINESS_CATEGORY, { message: 'Invalid business category' })
  businessCategory?: BUSINESS_CATEGORY | null;

  @IsOptional()
  @IsArray()
  @IsEnum(PLATFORMS, { each: true, message: 'Invalid platform selection' })
  platforms?: PLATFORMS[];
}
