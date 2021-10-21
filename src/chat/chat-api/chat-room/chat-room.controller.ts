import {
  Controller,
  Get,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ChatRoomService } from './chat-room.service';
import { MessageParamDto } from './dto/message-param.dto';
import { MessagesCountParamDto } from './dto/messages-count-param.dto';
import { MessageListDto } from './dto/message-list.dto';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { JwtRequestType } from '@shared/types/jwt-request.type';

@ApiHeader({
  name: 'Authorization',
  description: 'Your JWT token',
})
@Keys('_id')
@UseGuards(JwtAuthGuard)
@ApiTags('chat room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatApiService: ChatRoomService) {}

  @ApiOperation({ summary: 'Get chat messages' })
  @ApiResponse({ status: 200, type: () => MessageListDto })
  @Get(':id/:start/:howMany')
  @HttpCode(200)
  async getMessages(
    @Req() req: JwtRequestType,
    @Param() params: MessageParamDto,
  ): Promise<MessageListDto[]> {
    return this.chatApiService.getMessages(req, params);
  }

  @ApiOperation({ summary: 'Get chat messages count' })
  @ApiResponse({ status: 200, type: () => Number })
  @Get('messages-count/:id')
  @HttpCode(200)
  async getMessagesCount(
    @Req() req: JwtRequestType,
    @Param() params: MessagesCountParamDto,
  ): Promise<any> {
    return  this.chatApiService.getMessagesCount(req, params);;
  }
 
}
