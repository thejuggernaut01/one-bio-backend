import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AUTH_VALIDATION_MSG } from '../../auth/constants/auth-messages.constant';

const { EMAIL } = AUTH_VALIDATION_MSG;

class CreateWaitlistDto {
  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;
}

export { CreateWaitlistDto };
