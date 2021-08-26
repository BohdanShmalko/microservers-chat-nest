import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';

@Keys()
@UseGuards(JwtAuthGuard)
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    //console.log(client.request);
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
