import { Injectable } from '@nestjs/common';
import { UsersModel } from '@schemas/users.schema';
import { ListResponseItemDto } from '../../chat/chat-api/chat-list/dto/list-response-item.dto';
import { MembersModel } from '@schemas/members.schema';
import { MessageListDto } from '../../chat/chat-api/chat-room/dto/message-list.dto';
import {
  EFileTypes,
  EMessageStatus,
  EMessageTypes,
} from '@shared/to-dto/dto.enum';

@Injectable()
export class ToDtoService {
  public dbList(list: UsersModel): ListResponseItemDto[] {
    if (!list) return [];
    return list.members.map((member) => {
      let members;
      if (!member.room.name) {
        members = member.room.members.filter((item) => {
          return JSON.stringify(item._id) !== JSON.stringify(member._id);
        });
      }

      const photo = member.room.photo || 'default.jpeg';
      return {
        id: member._id,
        name: member.room.name
          ? member.room.name
          : `${members[0].user.firstName} ${members[0].user.lastName}`,
        message: member.messages.length ? member.messages[0].text : '',
        noChecked: member.notRecived.length,
        online: member.room.name ? true : members[0].user.isOnline,
        photo: 'http://localhost:3000/images/' + photo,
        status: '...write',
        time: member.messages.length ? member.messages[0].created : 0,
        isRoom: !!member.room.name,
      };
    });
  }

  public chatRoom(data: MembersModel): MessageListDto[] {
    return this.matrixToArray<MessageListDto>(
      data.room.members.map((member) => {
        return member.messages.map((message) => {
          return {
            id: message._id,
            date: message.created,
            photo: 'http://localhost:3000/images/' + member.user.photo,
            file: message.file
              ? {
                  href: 'http://localhost:3000/files/' + message.file.name,
                  name: message.file.name,
                  size: message.file.size,
                  type: this.fileToType(message.file.name),
                }
              : undefined,
            status: EMessageStatus.Dispatch,
            text: message.text,
            type:
              JSON.stringify(member._id) === JSON.stringify(data._id)
                ? EMessageTypes.User
                : EMessageTypes.Member,
          };
        });
      }),
    );
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
