import { IsString, Length } from 'class-validator';

export class CheckUsernameDto {
  @IsString()
  @Length(3, 30, { message: 'Username must be between 3 and 15 characters' })
  username: string;
}
