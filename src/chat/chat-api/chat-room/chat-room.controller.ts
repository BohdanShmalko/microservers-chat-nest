import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatRoomResponseDto } from './dto/chat-room-response.dto';
import { ListParamDto } from '../chat-list/dto/list-param.dto';

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
  @ApiResponse({ status: 200, type: () => ChatRoomResponseDto })
  @Get(':id/:start/:howMany')
  @HttpCode(200)
  async getMessages(
    @Param() params: ListParamDto,
  ): Promise<ChatRoomResponseDto> {
    return {
      name: 'Nika Jerrardo',
      isRoom: false,
      photo: 'http://localhost:3000/images/user1.jpeg',
      online: 1629891189000,
      messageList: [
        {
          id: 'fmfmfmfm',
          type: EMessageTypes.Member,
          photo: 'http://localhost:3000/images/user1.jpeg',
          text: 'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.\n',
          date: 1629876134000,
        },
        {
          id: 'ddkdkkd',
          type: EMessageTypes.Member,
          photo: 'http://localhost:3000/images/user1.jpeg',
          text: 'Can I send you files?',
          date: 1629876234000,
        },
        {
          id: 'kdkdkdkkd',
          photo: 'http://localhost:3000/images/user1.jpeg',
          type: EMessageTypes.User,
          status: EMessageStatus.Read,
          text: 'Hey! Okay, send out.',
          date: 1629876334000,
        },
        {
          id: 'dkkdkdkdk',
          type: EMessageTypes.Member,
          text: '',
          date: 1629876414000,
          photo: 'http://localhost:3000/images/user2.jpeg',
          file: {
            name: 'Style.zip',
            size: 42991616,
            type: EFileTypes.Any,
            href: '',
          },
        },
        {
          id: 'd,mkdkdkdkkd',
          type: EMessageTypes.User,
          photo: 'http://localhost:3000/images/user2.jpeg',
          status: EMessageStatus.Send,
          text: 'Hello! I tweaked everything you asked. I am sending the finished file.',
          date: 1629876434000,
        },
      ],
    };
  }
}
