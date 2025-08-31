import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Request,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../common/guard/auth.guard';
import { CheckUsernameDto } from './dto/check-username.dto';
import { ResponseMessage } from '../../common/decorator/response.decorator';
import { RESPONSE_CONSTANT } from '../../common/constants/response.constant';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(RESPONSE_CONSTANT.USER.GET_CURRENT_USER_SUCCESS)
  @UseGuards(AuthGuard)
  @Get('')
  async getUserProfile(@Request() req) {
    const userId = req.currentUser._id;
    return this.userService.getUserProfile(userId);
  }

  @ResponseMessage(RESPONSE_CONSTANT.USER.UPDATE_USER_PROFILE_SUCCESS)
  @UseGuards(AuthGuard)
  @Patch('')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.currentUser._id;
    return this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('check-username')
  async checkUsername(@Query() checkUsernameDto: CheckUsernameDto) {
    return this.userService.checkUsernameAvailability(
      checkUsernameDto.username,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':userId/personal-links/:linkId')
  async deletePersonalLink(@Request() req, @Param('linkId') linkId: string) {
    const userId = req.currentUser._id;
    return await this.userService.deletePersonalLink(userId, linkId);
  }

  @ResponseMessage(RESPONSE_CONSTANT.USER.DELETE_USER_SUCCESS)
  @UseGuards(AuthGuard)
  @Delete('')
  async deleteUser(@Request() req) {
    const userId = req.currentUser._id;
    return await this.userService.deleteUser(userId);
  }
}
