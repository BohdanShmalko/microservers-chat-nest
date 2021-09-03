import {
  Controller,
  Get,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ChatRoomService } from './chat-room.service';
import { MessageParamDto } from './dto/message-param.dto';
import { MessageListDto } from './dto/message-list.dto';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { JwtRequestType } from '@shared/types/jwt-request.type';

@Keys('_id')
@UseGuards(JwtAuthGuard)
@ApiTags('chat room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatApiService: ChatRoomService) {}

  @ApiOperation({ summary: 'Get chat mesages' })
  @ApiResponse({ status: 200, type: () => MessageListDto })
  @Get(':id/:start/:howMany')
  @HttpCode(200)
  async getMessages(
    @Req() req: JwtRequestType,
    @Param() params: MessageParamDto,
  ): Promise<MessageListDto[]> {
    return this.chatApiService.getMessages(req, params);
  }
}
