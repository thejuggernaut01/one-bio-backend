import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Waitlist } from './schema/waitlist.schema';
import { Model } from 'mongoose';
import { ERROR_CONSTANT } from 'src/common/constants/error.constant';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(Waitlist.name) private userModel: Model<Waitlist>,
    // private mailService: MailService,
  ) {}

  async create(payload: CreateWaitlistDto) {
    try {
      if (!payload.email) {
        throw new BadRequestException(ERROR_CONSTANT.WAITLIST.EMAIL_REQUIREED);
      }

      const existingUser = await this.userModel
        .findOne({ email: payload.email })
        .lean()
        .exec();

      if (existingUser) {
        throw new ConflictException(ERROR_CONSTANT.WAITLIST.USER_EXISTS);
      }

      const user = new this.userModel({
        ...payload,
      });

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

      return;
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
}
