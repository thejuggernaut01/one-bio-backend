import { Controller, Post, Body } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { ResponseMessage } from '../../common/decorator/response.decorator';
import { RESPONSE_CONSTANT } from '../../common/constants/response.constant';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @ResponseMessage(RESPONSE_CONSTANT.WAITLIST.REGISTER_SUCCESS)
  @Post()
  create(@Body() createWaitlistDto: CreateWaitlistDto) {
    return this.waitlistService.create(createWaitlistDto);
  }
}
