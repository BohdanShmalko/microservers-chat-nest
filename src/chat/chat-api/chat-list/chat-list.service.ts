import { Injectable } from '@nestjs/common';
import { ListParamDto } from './dto/list-param.dto';
import { ListResponseItemDto } from './dto/list-response-item.dto';
import { RoomsService } from '@db/rooms/rooms.service';
import { UsersService } from '@db/users/users.service';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { MembersService } from '@db/members/members.service';
import { NotRecivedService } from '@db/not-recived/not-recived.service';
import { MesagesService } from '@db/mesages/mesages.service';
import { ToDtoService } from '@shared/to-dto/to-dto.service';

@Injectable()
export class ChatListService {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    private authSharedService: AuthSharedService,
    private membersService: MembersService,
    private notRecivedService: NotRecivedService,
    private mesagesService: MesagesService,
    private toDto: ToDtoService,
  ) {}

  public async getListData(
    param: ListParamDto,
  ): Promise<ListResponseItemDto[]> {
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    const getUser = await this.usersService.getListById(
      '61279d505d6692dc25726762',
      start,
      howMany,
    );
    return [
      {
        id: 'aqw',
        name: 'Luy Robin',
        isRoom: false,
        photo: 'luy',
        noChecked: 2,
        message:
          'Most of its text is made up from sections 1.10.32–3 of Cicero De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes).',
        time: 1629471112000,
        online: true,
        status: '...writes',
      },
      {
        id: 'aqe',
        isRoom: false,
        name: 'Jared Sunn',
        photo: 'jared',
        noChecked: 1,
        message:
          'Most of its text is made up from sections 1.10.32–3 of Cicero De finibus bonorum et malorum.',
        time: 1629472112000,
        online: true,
        status: 'records voice message',
      },
      {
        id: 'aqr',
        isRoom: false,
        name: 'Nika Jerrardo',
        photo: 'nika',
        message:
          'Cicero famously orated against his political opponent Lucius Sergius Catilina.',
        noChecked: 0,
        time: 1629473112000,
        online: false,
        status: 'last online 5 hours ago',
      },
    ];
  }
}
