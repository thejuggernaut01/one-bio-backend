import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import {
  ICreateUser,
  IForgotPassword,
  ILogin,
  IResendVerifyEmail,
  IResetPassword,
} from './interface';
import { ERROR_CONSTANT } from '../../common/constants/error.constant';
import { BaseHelper } from '../../common/utils/helper.util';
// import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // private mailService: MailService,
    private otpService: OtpService,
  ) {}

  async signup(payload: ICreateUser) {
    try {
      if (payload.password !== payload.confirmPassword) {
        throw new BadRequestException(ERROR_CONSTANT.AUTH.PASSWORD_MISMATCH);
      }

      const existingUser = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();

      if (existingUser) {
        throw new ConflictException(ERROR_CONSTANT.AUTH.USER_EXISTS);
      }

      const hashedPassword = await BaseHelper.hashData(payload.password);

      const user = new this.userModel({
        ...payload,
        password: hashedPassword,
      });

      await this.otpService.generateOtp(user.email, 'verify_email');

      await user.save();

      // Mail service is available, but needs configuration
      // await this.mailService.sendVerificationEmail(
      //   'Verify your email',
      //   otpCode,
      //   {
      //     email: user.email,
      //     name: user.name,
      //   },
      // );

      return user;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async verifyEmail(email: string, code: number) {
    try {
      await this.otpService.verifyOtp(email, code, 'verify_email');

      const user = await this.userModel.findOneAndUpdate(
        { email },
        {
          $set: {
            isEmailVerified: true,
          },
        },
        { new: true },
      );

      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.USER_DOES_NOT_EXIST);
      }

      // await this.mailService.sendWelcomeEmail('A Bio', {
      //   email: user.email,
      //   name: user.name,
      // });

      return;
    } catch (error) {
      console.log(error);

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async resendVerifyEmail(payload: IResendVerifyEmail) {
    try {
      const user = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();
      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.USER_DOES_NOT_EXIST);
      }

      await this.otpService.generateOtp(user.email, 'verify_email');

      // await this.mailService.sendVerificationEmail(
      //   'Verify your email',
      //   otpCode,
      //   {
      //     email: user.email,
      //     name: user.name,
      //   },
      // );
      return;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async login(payload: ILogin) {
    try {
      const user = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();

      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.USER_DOES_NOT_EXIST);
      }

      const isPasswordValid = await BaseHelper.compareHashedData(
        payload.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.LOGIN_FAILED);
      }

      const token = BaseHelper.generateJwtAccessToken(user._id.toString());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...data } = user;

      return { ...data, token };
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async forgotPassword(payload: IForgotPassword) {
    try {
      const user = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();

      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.USER_DOES_NOT_EXIST);
      }

      await this.otpService.generateOtp(user.email, 'verify_email');

      // await this.mailService.sendForgotPasswordEmail(
      //   'Reset your email',
      //   otpCode,
      //   {
      //     email: user.email,
      //     name: user.name,
      //   },
      // );
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async resetPassword(payload: IResetPassword) {
    try {
      const { email, password } = payload;

      const hashedPassword = await BaseHelper.hashData(password);

      const result = await this.userModel.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
          },
        },
      );

      if (result.modifiedCount === 0) {
        throw new NotFoundException(ERROR_CONSTANT.AUTH.USER_DOES_NOT_EXIST);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }
}
