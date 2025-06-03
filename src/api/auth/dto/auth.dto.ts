import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AUTH_VALIDATION_MSG } from '../constants/auth-messages.constant';

const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CODE } = AUTH_VALIDATION_MSG;

class CreateUserDto {
  @IsString({ message: FIRST_NAME.IS_STRING })
  @IsNotEmpty({ message: FIRST_NAME.IS_NOT_EMPTY })
  @MinLength(2, { message: FIRST_NAME.MIN_LENGTH })
  @MaxLength(20, { message: FIRST_NAME.MAX_LENGTH })
  firstName: string;

  @IsString({ message: LAST_NAME.IS_STRING })
  @IsNotEmpty({ message: LAST_NAME.IS_NOT_EMPTY })
  @MinLength(2, { message: LAST_NAME.MIN_LENGTH })
  @MaxLength(20, { message: LAST_NAME.MAX_LENGTH })
  lastName: string;

  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;

  @IsString({ message: PASSWORD.IS_STRING })
  @IsNotEmpty({ message: PASSWORD.IS_NOT_EMPTY })
  @MinLength(6, { message: PASSWORD.MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD.MAX_LENGTH })
  @IsStrongPassword(
    {
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: PASSWORD.IS_STRONG_PASSWORD },
  )
  password: string;
}

class LoginDto {
  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;

  @IsString({ message: PASSWORD.IS_STRING })
  @IsNotEmpty({ message: PASSWORD.IS_NOT_EMPTY })
  @MinLength(6, { message: PASSWORD.MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD.MAX_LENGTH })
  password: string;
}

class VerifyEmailDto {
  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;

  @IsInt({ message: CODE.IS_INT })
  @IsNotEmpty({ message: CODE.IS_NOT_EMPTY })
  code: number;
}

class ResendVerifyEmailDto {
  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;
}

class ForgotPasswordDto {
  @IsString({ message: EMAIL.IS_STRING })
  @IsNotEmpty({ message: EMAIL.IS_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL.IS_EMAIL })
  email: string;
}

class ResetPasswordDto {
  @IsString({ message: PASSWORD.IS_STRING })
  @IsNotEmpty({ message: PASSWORD.IS_NOT_EMPTY })
  @MinLength(6, { message: PASSWORD.MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD.MAX_LENGTH })
  @IsStrongPassword(
    {
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: PASSWORD.IS_STRONG_PASSWORD },
  )
  password: string;
}

export {
  CreateUserDto,
  LoginDto,
  VerifyEmailDto,
  ResendVerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
};
