import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RoomMessageDto } from './dto/room-message.dto';
import { WsResponse } from '@nestjs/websockets';
import { MessageListDto } from '../chat-api/chat-room/dto/message-list.dto';

@Injectable()
export class StudyChatService {
  public async roomMessage(
    client: Socket,
    data: RoomMessageDto,
  ): Promise<WsResponse<MessageListDto>> {
    //MessageListDto

    return;
  }
}
