import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { MembersModel } from '@schemas/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(ESchemasName.Members)
    private membersRepo: Model<MembersModel>,
  ) {}

  // public async getLimitRoomsByUserId(
  //   userId: string,
  //   start: number,
  //   howMany: number,
  // ): Promise<MembersModel[] | null> {
  //   return this.membersRepo.find({ userId }, ['id'], {
  //     skip: start,
  //     limit: howMany,
  //   });
  // }
}
