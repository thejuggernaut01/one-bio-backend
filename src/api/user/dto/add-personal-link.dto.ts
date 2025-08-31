import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class AddPersonalLinkDto {
  @IsString()
  name: string;

  @IsUrl({}, { message: 'Invalid URL format' })
  url: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
