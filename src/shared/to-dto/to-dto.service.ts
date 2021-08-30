import { Injectable } from '@nestjs/common';
import { UsersModel } from '@schemas/users.schema';
import { ListResponseItemDto } from '../../chat/chat-api/chat-list/dto/list-response-item.dto';

@Injectable()
export class ToDtoService {
  public dbList(list: UsersModel): ListResponseItemDto[] {
    if (!list) return [];
    return list.members.map((member) => {
      let members;
      if (!member.room.name)
        members = member.room.members.filter((item) => item.id !== member.id);
      const photo = member.room.photo || 'default.jpeg';
      return {
        id: member.id,
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
}
