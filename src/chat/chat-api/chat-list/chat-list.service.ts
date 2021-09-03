import { HttpException, Injectable } from '@nestjs/common';

import { ListParamDto } from './dto/list-param.dto';
import { RoomsService } from '@db/rooms/rooms.service';
import { UsersService } from '@db/users/users.service';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { MesagesService } from '@db/mesages/mesages.service';
import { ToDtoService } from '@shared/to-dto/to-dto.service';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';

@Injectable()
export class ChatListService {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    private authSharedService: AuthSharedService,
    private mesagesService: MesagesService,
    private toDto: ToDtoService,
  ) {}

  public async getListData(
    req: JwtRequestType,
    param: ListParamDto,
  ): Promise<any> {
    const user = await this.usersService.getById(req.jwtData._id);
    if (!user) throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    const rooms = await this.usersService.getList(user._id, start, howMany);
    return this.toDto.dbList(rooms);
  }
}
