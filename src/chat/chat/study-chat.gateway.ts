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
import { Server } from 'socket.io';
import { ApiTags } from '@nestjs/swagger';

import { StudyChatService } from './study-chat.service';
import { RoomMessageDto } from './dto/room-message.dto';
import { StudyChatGuard } from './study-chat.guard';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtSocketType } from '@shared/types/jwt-socket.type';

import { CStudyChatConfig } from './study-chat.config';
import { RoomDto } from './dto/room.dto';

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

  @SubscribeMessage(CStudyChatConfig.server.updateMessage)
  updateMessage(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() message: { id: string; text: string },
  ): Promise<void> {
    return this.studyChatService.updateMessage(this.wss, client, message);
  }

  @SubscribeMessage(CStudyChatConfig.server.createRoom)
  createRoom(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() room: RoomDto,
  ): Promise<void> {
    return this.studyChatService.createRoom(this.wss, client, room);
  }

  @SubscribeMessage(CStudyChatConfig.server.startWriting)
  startWriting(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() room: { id: string },
  ): Promise<void> {
    return this.studyChatService.startWriting(this.wss, client, room.id);
  }

  @SubscribeMessage(CStudyChatConfig.server.stopWriting)
  stopWriting(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() room: { id: string },
  ): Promise<void> {
    return this.studyChatService.stopWriting(this.wss, client, room.id);
  }

  @SubscribeMessage(CStudyChatConfig.server.readMessages)
  readMessages(
    @ConnectedSocket() client: JwtSocketType,
    @MessageBody() room: { id: string; messages: string[] },
  ): Promise<void> {
    return this.studyChatService.readMessages(this.wss, client, room);
  }

  handleConnection(@ConnectedSocket() client: JwtSocketType): Promise<void> {
    return this.studyChatService.connect(this.wss, client);
  }

  handleDisconnect(@ConnectedSocket() client: JwtSocketType): Promise<void> {
    return this.studyChatService.disconnect(this.wss, client);
  }
}
