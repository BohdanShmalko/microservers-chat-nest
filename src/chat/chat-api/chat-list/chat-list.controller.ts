import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ChatListService } from './chat-list.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListParamDto } from './dto/list-param.dto';
import { ListResponseItemDto } from './dto/list-response-item.dto';

@ApiTags('chat list')
@Controller('chat-list')
export class ChatListController {
  constructor(private chatApiService: ChatListService) {}

  @ApiOperation({ summary: 'Get chat list' })
  @ApiResponse({ status: 200, type: () => ListResponseItemDto })
  @Get(':start/:howMany')
  @HttpCode(200)
  getListData(@Param() param: ListParamDto): Promise<ListResponseItemDto[]> {
    return this.chatApiService.getListData(param);
  }
}
