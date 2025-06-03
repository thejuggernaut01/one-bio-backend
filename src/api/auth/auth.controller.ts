import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginDto,
  ResendVerifyEmailDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { ResponseMessage } from '../../common/decorator/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Post('signp')
  async signup(@Body() body: CreateUserDto) {
    await this.authService.signup(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Post('verify-email')
  async verifyEmail(@Param('token') token: string) {
    await this.authService.verifyEmail(token);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.SEND_VERIFICATION_EMAIL_SUCCESS)
  @Post('/resend-verify-email')
  async resendVerifyEmail(@Body() body: ResendVerifyEmailDto) {
    await this.authService.resendVerifyEmail(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    await this.authService.login(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_EMAIL_SUCCESS)
  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_SUCCESS)
  @Patch('/reset-password')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword({
      token,
      password: body.password,
    });
  }
}
