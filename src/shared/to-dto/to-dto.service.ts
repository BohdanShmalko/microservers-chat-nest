import { Injectable } from '@nestjs/common';

import { MessageListDto } from '../../chat/chat-api/chat-room/dto/message-list.dto';
import {
  EFileTypes,
  EMessageStatus,
  EMessageTypes,
} from '@shared/to-dto/dto.enum';
import { UsersModel } from '@schemas/users.schema';
import { ListResponseItemDto } from '../../chat/chat-api/chat-list/dto/list-response-item.dto';
import { RoomsModel } from '@schemas/rooms.schema';
import { FilesModel } from '@schemas/files.schema';
import { MessageFileDto } from '../../chat/chat-api/chat-room/dto/message-file.dto';

@Injectable()
export class ToDtoService {
  public dbList(rooms: RoomsModel[]): ListResponseItemDto[] {
    if (!rooms) return [];
    return rooms.map((room) => {
      const lastMessage =
        room.messages && room.messages[room.messages.length - 1];
      const photo = room.photo || room.users[0].photo;
      return {
        id: room._id,
        isRoom: !!room.name,
        time: lastMessage ? lastMessage.created : Number(room.time),
        status: EMessageStatus.Dispatch,
        photo: process.env.IMAGES_URL + photo,
        online: room.users.some((user) => user.isOnline),
        noChecked: 0,
        message: lastMessage && lastMessage.text,
        file: lastMessage && lastMessage.file && lastMessage.file.name,
        name: room.name
          ? room.name
          : room.users[0].firstName + ' ' + room.users[0].lastName,
      };
    });
  }

  public chatRoom(room: RoomsModel): MessageListDto[] {
    return room.messages.map((message) => {
      const isMy =
        JSON.stringify(room.users[0]._id) === JSON.stringify(message.user._id);
      return {
        id: message._id,
        type: isMy ? EMessageTypes.User : EMessageTypes.Member,
        text: message.text,
        status: EMessageStatus.Read,
        file: this.toFile(message.file),
        photo: process.env.IMAGES_URL + message.user.photo,
        date: message.created,
      };
    });
  }

  public fileToType(fileName: string): string {
    const format = fileName.split('.')[1];
    if (!format) return EFileTypes.Any;
    const formats = {
      image: ['png', 'jpeg', 'jpg', 'svg'],
      video: ['mp4'],
      audio: ['mp3'],
    };
    for (const key in formats) {
      if (formats[key].indexOf(format)) return key;
    }
    return EFileTypes.Any;
  }

  public toFile(file: FilesModel | null): MessageFileDto | undefined {
    if (!file) return undefined;
    return {
      type: this.fileToType(file.name),
      size: file.size,
      name: file.name,
      href: 'http://localhost:3000/files/' + file.name,
    };
  }
}
