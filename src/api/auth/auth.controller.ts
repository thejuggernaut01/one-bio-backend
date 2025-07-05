import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginDto,
  ResendVerifyEmailDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { ResponseMessage } from '../../common/decorator/response.decorator';
import { RESPONSE_CONSTANT } from '../../common/constants/response.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.EMAIL_VERIFICATION_SUCCESS)
  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string; code: number }) {
    return await this.authService.verifyEmail(body.email, body.code);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.SEND_VERIFICATION_EMAIL_SUCCESS)
  @Post('/resend-verify-email')
  async resendVerifyEmail(@Body() body: ResendVerifyEmailDto) {
    return await this.authService.resendVerifyEmail(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_EMAIL_SUCCESS)
  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_SUCCESS)
  @Patch('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body);
  }
}
