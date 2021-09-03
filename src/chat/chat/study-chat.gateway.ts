import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { StudyChatService } from './study-chat.service';
import { Server, Socket } from 'socket.io';
import { RoomMessageDto } from './dto/room-message.dto';
import { MessageListDto } from '../chat-api/chat-room/dto/message-list.dto';
import { StudyChatGuard } from './study-chat.guard';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtSocketType } from '@shared/types/jwt-socket.type';
import { MessageResponseDto } from '@shared/dto/message-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Keys('_id')
@UseGuards(StudyChatGuard)
@ApiTags('chat sockets')
@WebSocketGateway(3001, { cors: true })
export class StudyChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private studyChatService: StudyChatService) {}

  @WebSocketServer()
  public wss: Server;

  @SubscribeMessage('sendMessage')
  roomMessage(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() message: RoomMessageDto,
  ): Promise<void> {
    return this.studyChatService.roomMessage(this.wss, client, message);
  }

  handleConnection(@ConnectedSocket() client: JwtSocketType): Promise<void> {
    return this.studyChatService.connect(client);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    return this.studyChatService.disconnect(client);
  }
}
