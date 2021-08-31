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

@Injectable()
export class ToDtoService {
  public dbList(list: UsersModel): ListResponseItemDto[] {
    if (!list) return [];
    return list.rooms.map((room) => {
      const lastMessage = room.messages[room.messages.length - 1];
      return {
        id: room._id,
        isRoom: !!room.name,
        time: lastMessage ? lastMessage.created : 0,
        status: EMessageStatus.Dispatch,
        photo: room.photo ? room.photo : room.users[0].photo,
        online: room.users.some((user) => user.isOnline),
        noChecked: 0,
        message: lastMessage.text,
        name: room.name
          ? room.name
          : room.users[0].firstName + ' ' + room.users[0].lastName,
      };
    });
  }

  //{
  // id: "000790505d6692dc25726762",
  // date: 1630312110380,
  // photo: "http://localhost:3000/images/user1.jpeg",
  // file: {
  // href: "http://localhost:3000/files/some.rar",
  // name: "some.rar",
  // size: 20000,
  // type: "image"
  // },
  // status: "dispatch",
  // text: "",
  // type: "member"
  // },

  public chatRoom(room: RoomsModel): MessageListDto[] {
    return room.messages.map((message) => {
      const isMy =
        JSON.stringify(room.users[0]._id) === JSON.stringify(message.user);
      return {
        id: message._id,
        type: isMy ? EMessageTypes.User : EMessageTypes.Member,
        text: message.text,
        status: EMessageStatus.Read,
        file: message.file
          ? {
              type: this.fileToType(message.file.name),
              size: message.file.size,
              name: message.file.name,
              href: 'http://localhost:3000/files/' + message.file.name,
            }
          : undefined,
        photo: message.user.photo,
        date: message.created,
      };
    });
  }

  private matrixToArray<T>(matrix: T[][]): T[] {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        result.push(matrix[i][j]);
      }
    }
    return result;
  }

  private fileToType(fileName: string): string {
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
}
