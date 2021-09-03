import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RoomMessageDto } from './dto/room-message.dto';
import { JwtSocketType } from '@shared/types/jwt-socket.type';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { UsersService } from '@db/users/users.service';
import { MesagesService } from '@db/mesages/mesages.service';
import { MessagesModel } from '@schemas/messages.schema';
import { MessageResponseDto } from './dto/message-response.dto';
import { EMessageStatus } from '@shared/to-dto/dto.enum';
import { ToDtoService } from '@shared/to-dto/to-dto.service';

@Injectable()
export class StudyChatService {
  constructor(
    private authService: AuthSharedService,
    private usersService: UsersService,
    private mesagesService: MesagesService,
    private toDto: ToDtoService,
  ) {}

  private logger: Logger = new Logger('Chat Gateway');

  public async roomMessage(
    wss: Server,
    client: JwtSocketType,
    data: RoomMessageDto,
  ): Promise<void> {
    const user = await this.usersService.checkRoom(
      client.jwtData._id,
      data.room,
    );
    if (!user || !user.rooms.length) {
      client.emit('error', {
        message: EHttpExceptionMessage.InvalidRoom,
      });
      return;
    }
    const membersIds: string[] = user.rooms[0].users.map((user) =>
      user._id.toString(),
    );
    const newMessage: MessagesModel = await this.mesagesService.createNew(
      user._id,
      data.message,
      data.room,
      membersIds,
    );
    const response: MessageResponseDto = {
      date: newMessage.created,
      email: user.email,
      file: this.toDto.toFile(newMessage.file),
      id: newMessage._id,
      photo: user.photo,
      status: EMessageStatus.Dispatch,
      text: newMessage.text,
    };
    wss.to(data.room).emit('room', response);
  }

  public async connect(client: JwtSocketType): Promise<void> {
    this.logger.log('Client try to connect');
    try {
      const keys = ['_id', 'iat'];
      const jwtData = await this.authService.getJwtData(client.handshake.auth);
      const jwtKeys = Object.keys(jwtData);
      if (keys && this.authService.diff(jwtKeys, keys).length) throw '';
      const { _id } = jwtData;
      const userRooms = await this.usersService.getRoomsById(_id);
      if (!userRooms) throw '';
      userRooms.rooms.map((room) => client.join(room._id.toString()));
      client.emit('connection', {
        message: 'Connection is success',
        email: userRooms.email,
      });
    } catch (e) {
      client.emit('error', {
        message: EHttpExceptionMessage.Unauthorized,
      });
    }
  }

  public async disconnect(client: Socket): Promise<void> {
    this.logger.log('Client disconnected');
  }
}
