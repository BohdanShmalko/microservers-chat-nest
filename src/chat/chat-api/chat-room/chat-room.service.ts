import { HttpException, Injectable, Param } from '@nestjs/common';
import { ListParamDto } from '../chat-list/dto/list-param.dto';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { UsersService } from '@db/users/users.service';
import { MessageParamDto } from './dto/message-param.dto';
import { MembersService } from '@db/members/members.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { MessageListDto } from './dto/message-list.dto';
import { ToDtoService } from '@shared/to-dto/to-dto.service';

@Injectable()
export class ChatRoomService {
  constructor(
    private authSharedService: AuthSharedService,
    private usersService: UsersService,
    private membersService: MembersService,
    private toDto: ToDtoService,
  ) {}

  async getMessages(param: MessageParamDto): Promise<MessageListDto[]> {
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    const data = await this.membersService.checkIsMember(
      '61279d505d6692dc25726762',
      param.id,
      start,
      howMany,
    );
    if (!data || !data.user)
      throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);
    return this.toDto.chatRoom(data);
  }
}

//{
//       name: 'Nika Jerrardo',
//       isRoom: false,
//       photo: 'http://localhost:3000/images/user1.jpeg',
//       online: 1629891189000,
//       messageList: [
//         {
//           id: 'fmfmfmfm',
//           type: EMessageTypes.Member,
//           photo: 'http://localhost:3000/images/user1.jpeg',
//           text: 'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.\n',
//           date: 1629876134000,
//         },
//         {
//           id: 'ddkdkkd',
//           type: EMessageTypes.Member,
//           photo: 'http://localhost:3000/images/user1.jpeg',
//           text: 'Can I send you files?',
//           date: 1629876234000,
//         },
//         {
//           id: 'kdkdkdkkd',
//           photo: 'http://localhost:3000/images/user1.jpeg',
//           type: EMessageTypes.User,
//           status: EMessageStatus.Read,
//           text: 'Hey! Okay, send out.',
//           date: 1629876334000,
//         },
//         {
//           id: 'dkkdkdkdk',
//           type: EMessageTypes.Member,
//           text: '',
//           date: 1629876414000,
//           photo: 'http://localhost:3000/images/user2.jpeg',
//           file: {
//             name: 'Style.zip',
//             size: 42991616,
//             type: EFileTypes.Any,
//             href: '',
//           },
//         },
//         {
//           id: 'd,mkdkdkdkkd',
//           type: EMessageTypes.User,
//           photo: 'http://localhost:3000/images/user2.jpeg',
//           status: EMessageStatus.Send,
//           text: 'Hello! I tweaked everything you asked. I am sending the finished file.',
//           date: 1629876434000,
//         },
//       ],
//     };
