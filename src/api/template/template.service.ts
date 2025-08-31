import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './schema/template.schema';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { CreateTemplateDto, UpdateUserTemplateDto } from './dto/template.dto';
import {
  UserTemplate,
  UserTemplateDocument,
} from './schema/user-template.schema';
import { ERROR_CONSTANT } from 'src/common/constants/error.constant';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
    @InjectModel(UserTemplate.name)
    private userTemplateModel: Model<UserTemplateDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // Creates a new base template (for admin use).
  async createBaseTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<Template> {
    try {
      const newTemplate = new this.templateModel(createTemplateDto);
      return newTemplate.save();
    } catch (error) {
      console.log('Error while creating a new base template', error);

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  // Returns all available base templates.
  async findAllBaseTemplates(): Promise<Template[]> {
    try {
      return this.templateModel.find().lean().exec();
    } catch (error) {
      console.log('Error while fetching base template', error);

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  // Allows a user to select a base template, which copies its style to their personal customization document.
  async selectTemplate(
    userId: string,
    templateId: string,
  ): Promise<UserTemplate> {
    try {
      if (!userId) {
        throw new BadRequestException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      const user = await this.userModel.findById(userId).lean().exec();

      if (!user) {
        throw new NotFoundException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      const baseTemplate = await this.templateModel
        .findById(templateId)
        .lean()
        .exec();

      if (!baseTemplate) {
        throw new NotFoundException(
          `Base template with ID "${templateId}" not found`,
        );
      }

      return this.userTemplateModel
        .findOneAndUpdate(
          { user: userId },
          { style: baseTemplate.style, baseTemplate: templateId },
          { upsert: true, new: true },
        )
        .lean()
        .exec();
    } catch (error) {
      console.log('Error while selecting template', error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  // Fetches and combines user data with their customized template style for their public-facing page.
  async getPublicProfileByUsername(username: string): Promise<any> {
    try {
      if (!username) {
        throw new BadRequestException(ERROR_CONSTANT.USER.USERNAME_NOT_FOUND);
      }

      const user = await this.userModel.findOne({ username }).lean().exec();
      if (!user) {
        throw new NotFoundException(
          `User with username "${username}" not found`,
        );
      }

      const userTemplate = await this.userTemplateModel
        .findOne({ user: user._id })
        .lean()
        .exec();

      const defaultStyle = {
        buttonStyle: 'rounded',
        buttonBorder: false,
        backgroundColor: '#ffffff',
        backgroundImage: '',
        textColor: '#000000',
        fontFamily: 'Inter',
        overlay: false,
      };

      const profile = {
        name: user.name,
        username: user.username,
        avatar: user.profileImageUrl,
        bio: user.bio,
        location: user.location,
      };

      const links = user.personalLinks
        .filter((link) => link.isVisible)
        .map((link) => ({ text: link.name, url: link.url }));

      return {
        style: userTemplate ? userTemplate.style : defaultStyle,
        profile,
        links,
      };
    } catch (error) {
      console.log(
        'Error while fetching user profile with customized template style',
        error,
      );
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  //  Finds the specific template customizations for a given user.
  async findUserTemplate(userId: string): Promise<UserTemplate> {
    try {
      if (!userId) {
        throw new BadRequestException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      const userTemplate = await this.userTemplateModel
        .findOne({ user: userId })
        .lean()
        .exec();

      if (!userTemplate) {
        throw new NotFoundException(
          `Custom template for user with ID "${userId}" not found`,
        );
      }
      return userTemplate;
    } catch (error) {
      console.log('Error while fetching user template', error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }

  /**
   * Updates a user's specific template customizations.
   */
  async updateUserTemplate(
    userId: string,
    updateUserDto: UpdateUserTemplateDto,
  ): Promise<UserTemplate> {
    try {
      if (!userId) {
        throw new BadRequestException(ERROR_CONSTANT.USER.NOT_FOUND);
      }

      return this.userTemplateModel
        .findOneAndUpdate(
          { user: userId },
          { $set: { style: updateUserDto.style } },
          { upsert: true, new: true },
        )
        .exec();
    } catch (error) {
      console.log('Error while updating user template', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        ERROR_CONSTANT.GENERAL.SERVER_ERROR,
      );
    }
  }
}
