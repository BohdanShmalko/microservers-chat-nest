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
  async getListData(
    @Param() params: ListParamDto,
  ): Promise<ListResponseItemDto[]> {
    return [
      {
        id: 'aqw',
        data: {
          firstName: 'Luy',
          lastName: 'Robin',
          photo: 'luy',
          noChecked: 2,
          message:
            'Most of its text is made up from sections 1.10.32–3 of Cicero De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes).',
          time: 1629471112000,
          online: true,
          status: '...writes',
        },
      },
      {
        id: 'aqe',
        data: {
          firstName: 'Jared',
          lastName: 'Sunn',
          photo: 'jared',
          noChecked: 1,
          message:
            'Most of its text is made up from sections 1.10.32–3 of Cicero De finibus bonorum et malorum.',
          time: 1629472112000,
          online: true,
          status: 'records voice message',
        },
      },
      {
        id: 'aqr',
        data: {
          firstName: 'Nika',
          lastName: 'Jerrardo',
          photo: 'nika',
          message:
            'Cicero famously orated against his political opponent Lucius Sergius Catilina.',
          noChecked: 0,
          time: 1629473112000,
          online: false,
          status: 'last online 5 hours ago',
        },
      },
    ];
  }
}
