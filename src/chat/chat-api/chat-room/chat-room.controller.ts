import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListParamDto } from '../chat-list/dto/list-param.dto';
import { MessageParamDto } from './dto/message-param.dto';
import { MessageListDto } from './dto/message-list.dto';

export enum EMessageTypes {
  Member = 'member',
  User = 'user',
}

export enum EFileTypes {
  Video = 'video',
  Audio = 'audio',
  Image = 'image',
  Any = 'any',
}

export enum EMessageStatus {
  Dispatch = 'dispatch',
  Read = 'read',
  Send = 'send',
}

@ApiTags('chat room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatApiService: ChatRoomService) {}

  @ApiOperation({ summary: 'Get chat mesages' })
  @ApiResponse({ status: 200, type: () => MessageListDto })
  @Get(':id/:start/:howMany')
  @HttpCode(200)
  async getMessages(@Param() params: MessageParamDto): Promise<any> {
    return this.chatApiService.getMessages(params);
  }
}
