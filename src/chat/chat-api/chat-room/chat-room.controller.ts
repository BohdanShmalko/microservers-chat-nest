import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageParamDto } from './dto/message-param.dto';
import { MessageListDto } from './dto/message-list.dto';

@ApiTags('chat room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatApiService: ChatRoomService) {}

  @ApiOperation({ summary: 'Get chat mesages' })
  @ApiResponse({ status: 200, type: () => MessageListDto })
  @Get(':id/:start/:howMany')
  @HttpCode(200)
  async getMessages(
    @Param() params: MessageParamDto,
  ): Promise<MessageListDto[]> {
    return this.chatApiService.getMessages(params);
  }
}
