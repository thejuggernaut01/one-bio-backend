import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CreateTemplateDto, UpdateUserTemplateDto } from './dto/template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  /**
   * Gets the combined profile and style data for a user's public page.
   */
  @Get('profile/:username')
  async getPublicProfile(@Param('username') username: string) {
    return await this.templateService.getPublicProfileByUsername(username);
  }

  /**
   * Gets all available base templates for users to choose from.
   */
  @Get()
  async findAllBaseTemplates() {
    return await this.templateService.findAllBaseTemplates();
  }

  /**
   * Gets the authenticated user's current template customization.
   */
  @UseGuards(AuthGuard)
  @Get('mine')
  async findMyTemplate(@Req() req) {
    const userId = req.currentUser._id;
    return await this.templateService.findUserTemplate(userId);
  }

  /**
   * Allows an authenticated user to select a base template.
   */
  @UseGuards(AuthGuard)
  @Post('select/:templateId')
  async selectTemplate(@Param('templateId') templateId: string, @Req() req) {
    const userId = req.currentUser._id;
    return await this.templateService.selectTemplate(userId, templateId);
  }

  /**
   * Updates the authenticated user's template style customizations.
   */
  @UseGuards(AuthGuard)
  @Patch('mine')
  async update(@Body() updateUserDto: UpdateUserTemplateDto, @Req() req) {
    const userId = req.currentUser._id;
    return await this.templateService.updateUserTemplate(userId, updateUserDto);
  }

  /**
   * Creates a new base template (should be protected by an AdminGuard).
   */
  // @UseGuards(AdminGuard)
  @Post('base')
  async createBaseTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return await this.templateService.createBaseTemplate(createTemplateDto);
  }
}
