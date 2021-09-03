import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ApiTags } from '@nestjs/swagger';

import { StudyChatService } from './study-chat.service';
import { RoomMessageDto } from './dto/room-message.dto';
import { StudyChatGuard } from './study-chat.guard';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtSocketType } from '@shared/types/jwt-socket.type';

import { CStudyChatConfig } from './study-chat.config';

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

  @SubscribeMessage(CStudyChatConfig.server.sendMessage)
  createMessage(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() message: RoomMessageDto,
  ): Promise<void> {
    return this.studyChatService.createMessage(this.wss, client, message);
  }

  @SubscribeMessage(CStudyChatConfig.server.deleteMessage)
  deleteMessage(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() message: { id: string },
  ): Promise<void> {
    return this.studyChatService.deleteMessage(this.wss, client, message);
  }

  handleConnection(@ConnectedSocket() client: JwtSocketType): Promise<void> {
    return this.studyChatService.connect(client);
  }

  handleDisconnect(): Promise<void> {
    return this.studyChatService.disconnect();
  }
}
