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
    return this.toDto.dbList(getUser);
  }
}
