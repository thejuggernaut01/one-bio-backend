import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/model/user.model';
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
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService,
  ) {}

  async signup(payload: ICreateUser) {
    const session = await this.userModel.startSession();
    session.startTransaction();

    try {
      const existingUser = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();

      if (existingUser) {
        throw new ConflictException(ERROR_CONSTANT.AUTH.USER_EXISTS);
      }

      const token = BaseHelper.generateRandomString(15);

      const hashedPassword = await BaseHelper.hashData(payload.password);

      const [user] = await this.userModel.create(
        [
          {
            ...payload,
            password: hashedPassword,
          },
        ],
        { session },
      );

      await user.save({ session });

      await this.userModel.updateOne(
        { email: user.email },
        {
          $set: {
            verificationToken: token,
            verificationTokenExpiration: Date.now() + 30 * 60 * 1000,
          },
        },
        { session },
      );

      await session.commitTransaction();

      await this.mailService.sendVerificationEmail('Verify your email', token, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      return user;
    } catch (error) {
      await session.abortTransaction();

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    } finally {
      session.endSession();
    }
  }

  async verifyEmail(token: string) {
    try {
      const user = await this.userModel
        .findOne({
          verificationToken: token,
          verificationTokenExpiration: { $gt: Date.now() },
        })
        .lean()
        .exec();

      if (!user) {
        throw new UnauthorizedException(
          ERROR_CONSTANT.AUTH.EMAIL_VERIFICATION_FAILED,
        );
      }

      await this.userModel
        .updateOne(
          {
            email: user.email,
          },
          {
            $set: {
              isEmailVerified: true,
              verificationToken: undefined,
              verificationTokenExpiration: undefined,
            },
          },
        )
        .exec();

      await this.mailService.sendWelcomeEmail('Welcome to Embellishment Hub', {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      return;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

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

      const token = BaseHelper.generateRandomString(15);

      await this.userModel
        .updateOne(
          { email: user.email },
          {
            $set: {
              verificationToken: token,
              verificationTokenExpiration: Date.now() + 1800000,
            },
          },
        )
        .exec();

      await this.mailService.sendVerificationEmail('Verify your email', token, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      return;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async login(payload: ILogin) {
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

    return { ...user, token };
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

      const token = BaseHelper.generateRandomString(15);

      await this.userModel
        .updateOne(
          { email: user.email },
          {
            $set: {
              resetToken: token,
              resetTokenExpiration: Date.now() + 1800000,
            },
          },
        )
        .exec();

      await this.mailService.sendForgotPasswordEmail(
        'Reset your email',
        token,
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      );

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
      const user = await this.userModel
        .findOne({
          resetToken: payload.token,
          resetTokenExpiration: { $gt: Date.now() },
        })
        .lean()
        .exec();

      if (!user) {
        throw new UnauthorizedException(
          ERROR_CONSTANT.AUTH.PASSWORD_RESET_FAILED,
        );
      }

      const hashedPassword = await BaseHelper.hashData(payload.password);

      await this.userModel
        .updateOne(
          { email: user.email },
          {
            $set: {
              password: hashedPassword,
              resetToken: undefined,
              resetTokenExpiration: undefined,
            },
          },
        )
        .exec();

      return;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }
}
