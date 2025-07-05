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

const { NAME, EMAIL, PASSWORD, CODE } = AUTH_VALIDATION_MSG;

class CreateUserDto {
  @IsString({ message: NAME.IS_STRING })
  @IsNotEmpty({ message: NAME.IS_NOT_EMPTY })
  @MinLength(2, { message: NAME.MIN_LENGTH })
  @MaxLength(20, { message: NAME.MAX_LENGTH })
  name: string;

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
  confirmPassword: string;
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

export {
  CreateUserDto,
  LoginDto,
  VerifyEmailDto,
  ResendVerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
};
