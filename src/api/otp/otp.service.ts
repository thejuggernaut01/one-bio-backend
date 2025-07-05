import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './schema/otp.schema';
import { Model } from 'mongoose';
import { BaseHelper } from '../../common/utils/helper.util';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  async generateOtp(
    email: string,
    purpose: 'verify_email' | 'reset_password',
  ): Promise<number> {
    await this.otpModel.updateMany(
      {
        email,
        purpose,
        usedAt: { $exists: false }, // not yet used
        expiresAt: { $gt: new Date() }, // still valid
      },
      { $set: { usedAt: new Date() } }, // mark as used
    );

    const code = BaseHelper.generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otpDoc = new this.otpModel({ email, code, purpose, expiresAt });
    await otpDoc.save();

    return code;
  }

  async verifyOtp(
    email: string,
    code: number,
    purpose: 'verify_email' | 'reset_password',
  ) {
    const otp = await this.otpModel
      .findOne({ email, code, purpose })
      .sort({ createdAt: -1 })
      .exec();

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otp.usedAt) {
      throw new BadRequestException('OTP already used');
    }

    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    otp.usedAt = new Date();
    await otp.save();

    return true;
  }
}
