import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsIn,
  IsNotEmptyObject,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO for the Style object, used in other DTOs
export class StyleDto {
  @IsOptional()
  @IsIn(['rounded', 'pill', 'square', 'outline'])
  readonly buttonStyle?: 'rounded' | 'pill' | 'square' | 'outline';

  @IsOptional()
  @IsBoolean()
  readonly buttonBorder?: boolean;

  @IsOptional()
  @IsString()
  readonly backgroundColor?: string;

  @IsOptional()
  @IsString()
  readonly backgroundImage?: string;

  @IsOptional()
  @IsString()
  readonly textColor?: string;

  @IsOptional()
  @IsString()
  readonly fontFamily?: string;

  @IsOptional()
  @IsBoolean()
  readonly overlay?: boolean;
}

// DTO for creating a new BASE template (likely an admin-only action).
export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ValidateNested()
  @Type(() => StyleDto)
  @IsNotEmptyObject()
  readonly style: StyleDto;
}

// DTO for updating a user's personalized template style.
export class UpdateUserTemplateDto {
  @ValidateNested()
  @Type(() => StyleDto)
  @IsOptional()
  @IsNotEmptyObject()
  readonly style?: StyleDto;
}
