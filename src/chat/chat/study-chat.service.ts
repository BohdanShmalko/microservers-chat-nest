import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

import { RoomMessageDto } from './dto/room-message.dto';
import { JwtSocketType } from '@shared/types/jwt-socket.type';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { UsersService } from '@db/users/users.service';
import { MesagesService } from '@db/mesages/mesages.service';
import { RoomsService } from '@db/rooms/rooms.service';
import { MessagesModel } from '@schemas/messages.schema';
import { MessageResponseDto } from './dto/message-response.dto';
import { EMessageStatus } from '@shared/to-dto/dto.enum';
import { ToDtoService } from '@shared/to-dto/to-dto.service';
import { CStudyChatConfig } from './study-chat.config';
import { UsersModel } from '@schemas/users.schema';

@Injectable()
export class StudyChatService {
  constructor(
    private authService: AuthSharedService,
    private usersService: UsersService,
    private mesagesService: MesagesService,
    private roomsService: RoomsService,
    private toDto: ToDtoService,
  ) {}

  private logger: Logger = new Logger('Chat Gateway');

  public async createMessage(
    wss: Server,
    client: JwtSocketType,
    message: RoomMessageDto,
  ): Promise<void> {
    if (!message.room || !message.message)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.InvalidData,
      );
    const user = await this.usersService.checkRoom(
      client.jwtData._id,
      message.room,
    );
    if (!user || !user.rooms.length)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.InvalidRoom,
      );
    const membersIds: string[] = user.rooms[0].users.map((user) =>
      user._id.toString(),
    );
    const newMessage: MessagesModel = await this.mesagesService.createNew(
      user._id.toString(),
      message.message,
      message.room,
      membersIds,
    );
    await this.usersService.addMessage(membersIds, newMessage._id.toString());
    await this.roomsService.addMessage(message.room, newMessage._id);
    const response: MessageResponseDto = {
      date: newMessage.created,
      email: user.email,
      file: this.toDto.toFile(newMessage.file),
      id: newMessage._id.toString(),
      photo: process.env.IMAGES_URL + user.photo,
      status: EMessageStatus.Dispatch,
      text: newMessage.text,
      room: newMessage.room._id,
    };
    wss.to(message.room).emit(CStudyChatConfig.client.message, response);
    this.logger.log(`Message ${newMessage._id} created by ${user._id}`);
  }

  public async updateMessage(
    wss: Server,
    client: JwtSocketType,
    message: { id: string; text: string },
  ): Promise<void> {
    const messageData = await this.userForUpdate(client, message);
    if (!messageData) return;

    await this.mesagesService.updateText(message.id, message.text);

    wss
      .to(messageData.room._id.toString())
      .emit(CStudyChatConfig.client.updateMessage, message);
    this.logger.log(
      `Message ${message.id} updated by ${messageData.user._id} to ${message.text}`,
    );
  }

  public async deleteMessage(
    wss: Server,
    client: JwtSocketType,
    message: { id: string },
  ): Promise<void> {
    const messageData = await this.userForUpdate(client, message);
    if (!messageData) return;

    const deleteResult = await this.mesagesService.deleteById(message.id);
    if (!deleteResult.deletedCount)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.DeleteError,
      );
    const membersIds: string[] = messageData.room.users.map((user) =>
      user._id.toString(),
    );

    await this.usersService.deleteMessage(membersIds, message.id);
    wss
      .to(messageData.room._id.toString())
      .emit(CStudyChatConfig.client.deleteMessage, message.id);
    this.logger.log(`Message ${message.id} deleted by ${messageData.user._id}`);
  }

  public async connect(wss: Server, client: JwtSocketType): Promise<void> {
    this.logger.log('Client try to connect');
    try {
      const userRooms = await this.getUser(client);
      userRooms.rooms.map((room) => {
        client.join(room._id.toString());
        wss
          .to(room._id.toString())
          .emit(CStudyChatConfig.client.join, userRooms.email);
      });
      client.emit(CStudyChatConfig.client.connection, {
        message: 'Connection is success',
        email: userRooms.email,
      });
    } catch (e) {
      this.authService.wsError(client, EHttpExceptionMessage.Unauthorized);
    }
  }

  public async disconnect(wss: Server, client: JwtSocketType): Promise<void> {
    try {
      const userRooms = await this.getUser(client);
      userRooms.rooms.map((room) => {
        client.leave(room._id.toString());
        wss
          .to(room._id.toString())
          .emit(CStudyChatConfig.client.leave, userRooms.email);
      });
    } catch (e) {
      this.logger.log('Disconnect error', e);
    }
    this.logger.log('Client disconnected');
  }

  private async getUser(client: JwtSocketType): Promise<UsersModel> {
    const keys = ['_id', 'iat'];
    const jwtData = await this.authService.getJwtData(client.handshake.auth);
    const jwtKeys = Object.keys(jwtData);
    if (keys && this.authService.diff(jwtKeys, keys).length) throw '';
    const { _id } = jwtData;
    const userRooms = await this.usersService.getRoomsById(_id);
    if (!userRooms) throw '';
    return userRooms;
  }

  private async userForUpdate(
    client: JwtSocketType,
    message: { id: string },
  ): Promise<MessagesModel | void> {
    if (!message.id)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.InvalidData,
      );
    const messageData: MessagesModel | null =
      await this.mesagesService.getForDelete(message.id, client.jwtData._id);
    if (!messageData)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.MessageAlreadyDeleted,
      );
    if (!messageData.user)
      return this.authService.wsError(
        client,
        EHttpExceptionMessage.MessageAlreadyDeleted,
      );
    return messageData;
  }
}
