import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { ERROR_CONSTANT } from '../../common/constants/error.constant';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      if (updateUserDto.username) {
        const existingUser = await this.userModel
          .findOne({ username: updateUserDto.username.toLowerCase() })
          .exec();
        if (existingUser && existingUser._id.toString() !== userId) {
          throw new ConflictException(ERROR_CONSTANT.USER.ALREADY_TAKEN);
        }
      }

      // Update the user with provided fields
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $set: {
              ...updateUserDto,
              username: updateUserDto.username?.toLowerCase(),
            },
          },
          { new: true, runValidators: true },
        )
        .select('-password')
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      return updatedUser;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async checkUsernameAvailability(
    username: string,
  ): Promise<{ isAvailable: boolean }> {
    try {
      const existingUser = await this.userModel
        .findOne({ username: username.toLowerCase() })
        .exec();
      return { isAvailable: !!existingUser };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async getUserProfile(userId: string): Promise<User> {
    try {
      const user = await this.userModel
        .findById(userId)
        .select('-password')
        .exec();

      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const result = await this.userModel.findByIdAndDelete(userId).exec();
      if (!result) {
        throw new NotFoundException(ERROR_CONSTANT.USER.NOT_FOUND);
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
