import { HttpException, Injectable, Param } from '@nestjs/common';
import { ListParamDto } from '../chat-list/dto/list-param.dto';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { UsersService } from '@db/users/users.service';
import { MessageParamDto } from './dto/message-param.dto';
import { MembersService } from '@db/members/members.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';

export enum EMessageTypes {
  Member = 'member',
  User = 'user',
}

export enum EFileTypes {
  Video = 'video',
  Audio = 'audio',
  Image = 'image',
  Any = 'any',
}

export enum EMessageStatus {
  Dispatch = 'dispatch',
  Read = 'read',
  Send = 'send',
}

@Injectable()
export class ChatRoomService {
  constructor(
    private authSharedService: AuthSharedService,
    private usersService: UsersService,
    private membersService: MembersService,
  ) {}

  async getMessages(param: MessageParamDto): Promise<any> {
    const howMany: number = this.authSharedService.stringIdToInt(param.howMany);
    const start: number = this.authSharedService.stringIdToInt(param.start);
    // const data = await this.membersService.checkIsMember(
    //   '61279d505d6692dc25726762',
    //   param.id,
    //   start,
    //   howMany,
    // );
    // if (!data || !data.user)
    //   throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);

    return {
      aqr: {
        name: 'Nika Jerrardo',
        photo: '/assets/img/nika.png',
        online: 1629891189000,
        messageList: [
          {
            id: 0,
            type: EMessageTypes.Member,
            photo: '/assets/img/nika.png',
            text: 'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.\n',
            date: 1629876134000,
          },
          {
            id: 1,
            type: EMessageTypes.Member,
            photo: '/assets/img/nika.png',
            text: 'Can I send you files?',
            date: 1629876234000,
          },
          {
            id: 2,
            type: EMessageTypes.User,
            status: EMessageStatus.Read,
            text: 'Hey! Okay, send out.',
            date: 1629876334000,
          },
          {
            id: 3,
            type: EMessageTypes.Member,
            date: 1629876414000,
            photo: '/assets/img/nika.png',
            file: {
              name: 'Style.zip',
              size: 42991616,
              type: EFileTypes.Any,
              href: '',
            },
          },
          {
            id: 4,
            type: EMessageTypes.User,
            status: EMessageStatus.Send,
            text: 'Hello! I tweaked everything you asked. I am sending the finished file.',
            date: 1629876434000,
          },
        ],
      },
      aqe: {
        name: 'Jared Sunn',
        photo: '/assets/img/jared.png',
        online: 1629472112000,
        messageList: [
          {
            id: 1,
            type: EMessageTypes.Member,
            photo: '/assets/img/jared.png',
            text: 'Can I send you files?',
            date: 1629876234000,
          },
          {
            id: 2,
            type: EMessageTypes.User,
            status: EMessageStatus.Read,
            text: 'Hey! Okay, send out.',
            date: 1629876334000,
          },
          {
            id: 3,
            type: EMessageTypes.Member,
            date: 1629876414000,
            photo: '/assets/img/jared.png',
            file: {
              name: 'Style.zip',
              size: 42991616,
              type: EFileTypes.Any,
              href: '',
            },
          },
          {
            id: 4,
            type: EMessageTypes.User,
            status: EMessageStatus.Send,
            text: 'Hello! I tweaked everything you asked. I am sending the finished file.',
            date: 1629876434000,
          },
        ],
      },
      aqw: {
        name: 'Luy Robin',
        photo: '/assets/img/luy.png',
        online: 1629471112000,
        messageList: [
          {
            id: 0,
            type: EMessageTypes.Member,
            photo: '/assets/img/luy.png',
            text: 'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.\n',
            date: 1629876134000,
          },
          {
            id: 1,
            type: EMessageTypes.Member,
            photo: '/assets/img/luy.png',
            text: 'Can I send you files?',
            date: 1629876234000,
          },
          {
            id: 2,
            type: EMessageTypes.User,
            status: EMessageStatus.Read,
            text: 'Hey! Okay, send out.',
            date: 1629876334000,
          },
        ],
      },
    }[param.id];
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
