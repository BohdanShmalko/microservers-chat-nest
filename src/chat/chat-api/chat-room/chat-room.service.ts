import { HttpException, Injectable } from '@nestjs/common';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { UsersService } from '@db/users/users.service';
import { MessageParamDto } from './dto/message-param.dto';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { ToDtoService } from '@shared/to-dto/to-dto.service';
import { RoomsService } from '@db/rooms/rooms.service';

@Injectable()
export class ChatRoomService {
  constructor(
    private authSharedService: AuthSharedService,
    private roomsService: RoomsService,
    private toDto: ToDtoService,
  ) {}

  async getMessages(param: MessageParamDto): Promise<any> {
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    const messages = await this.roomsService.getMessages(
      '61279d505d6692dc25726762',
      param.id,
      start,
      howMany,
    );
    return this.toDto.chatRoom(messages);
  }
}
