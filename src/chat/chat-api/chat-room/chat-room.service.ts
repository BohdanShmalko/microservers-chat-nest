import { HttpException, Injectable } from '@nestjs/common';

import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { MessageParamDto } from './dto/message-param.dto';
import { ToDtoService } from '@shared/to-dto/to-dto.service';
import { RoomsService } from '@db/rooms/rooms.service';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { UsersService } from '@db/users/users.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { MessagesCountParamDto } from './dto/messages-count-param.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    private authSharedService: AuthSharedService,
    private roomsService: RoomsService,
    private usersService: UsersService,
    private toDto: ToDtoService,
  ) {}

  async getMessages(req: JwtRequestType, param: MessageParamDto): Promise<any> {
    const user = await this.usersService.getById(req.jwtData._id);
    if (!user) throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    const messages = await this.roomsService.getMessages(
      user._id,
      param.id,
      start,
      howMany,
    );
    return this.toDto.chatRoom(messages);
  }

  async getMessagesCount(
    req: JwtRequestType,
    param: MessagesCountParamDto,
  ): Promise<any> {
    const user = await this.usersService.getById(req.jwtData._id);
    if (!user) throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);
    const messages = await this.roomsService.getMessagesCount(param.id);
    return messages ? messages.messages.length : 0;
  }
}
