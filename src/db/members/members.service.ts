import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MembersModel } from '@schemas/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(ESchemasName.Members)
    private membersRepo: Model<MembersModel>,
  ) {}

  public async checkIsMember(
    userId: string,
    memberId: string,
    start: number,
    howMany: number,
  ): Promise<MembersModel | null> {
    return this.membersRepo.findOne({ _id: memberId }, ['id']).populate([
      {
        path: 'user',
        model: ESchemasName.Users,
        match: { _id: userId },
      },
      {
        path: 'room',
        model: ESchemasName.Rooms,
        populate: [
          {
            path: 'members',
            model: ESchemasName.Members,
            populate: [
              {
                path: 'user',
                model: ESchemasName.Users,
              },
              {
                path: 'messages',
                model: ESchemasName.Messages,
                populate: [
                  {
                    path: 'file',
                    model: ESchemasName.Files,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }
}
