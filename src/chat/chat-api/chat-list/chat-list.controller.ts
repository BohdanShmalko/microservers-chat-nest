import {
  Controller,
  Get,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatListService } from './chat-list.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListParamDto } from './dto/list-param.dto';
import { ListResponseItemDto } from './dto/list-response-item.dto';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { JwtRequestType } from '@shared/types/jwt-request.type';

@Keys('_id')
@UseGuards(JwtAuthGuard)
@ApiTags('chat list')
@Controller('chat-list')
export class ChatListController {
  constructor(private chatApiService: ChatListService) {}

  @ApiOperation({ summary: 'Get chat list' })
  @ApiResponse({ status: 200, type: () => ListResponseItemDto })
  @Get(':start/:howMany')
  @HttpCode(200)
  getListData(
    @Req() req: JwtRequestType,
    @Param() param: ListParamDto,
  ): Promise<ListResponseItemDto[]> {
    return this.chatApiService.getListData(req, param);
  }
}
