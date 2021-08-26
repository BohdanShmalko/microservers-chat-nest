import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { ChatApiService } from './chat-api.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '@shared/dto/message-response.dto';
import { CheckEmailDto } from '../../auth/registration/dto/check-email.dto';
import { Response } from 'express';

@Controller('chat-static')
export class ChatApiController {
  constructor(private chatApiService: ChatApiService) {}

  // @ApiOperation({ summary: 'User info' })
  // @ApiResponse({ status: 200, type: () => MessageResponseDto })
  // @Get()
  // @HttpCode(200)
  // userInfo(
  //   @Body() checkEmailDto: CheckEmailDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   return this.registrationService.checkEmail(checkEmailDto, res);
  // }
  //
  // @ApiOperation({ summary: 'Get chat list' })
  // @ApiResponse({ status: 200, type: () => MessageResponseDto })
  // @Post()
  // @HttpCode(200)
  // (
  //   @Body() checkEmailDto: CheckEmailDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   return this.registrationService.checkEmail(checkEmailDto, res);
  // }
  //
  // @ApiOperation({ summary: 'Get chat list' })
  // @ApiResponse({ status: 200, type: () => MessageResponseDto })
  // @Post()
  // @HttpCode(200)
  // checkEmail(
  //   @Body() checkEmailDto: CheckEmailDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   return this.registrationService.checkEmail(checkEmailDto, res);
  // }
}
