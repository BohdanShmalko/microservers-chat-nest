import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { UsersModel } from '@schemas/users.schema';
import { UserInfoDto } from '../../auth/registration/dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ESchemasName.Users)
    private usersRepo: Model<UsersModel>,
  ) {}

  public async getById(id: string): Promise<UsersModel | null> {
    return this.usersRepo.findById(id);
  }

  public async getByEmail(email: string): Promise<UsersModel | null> {
    return this.usersRepo.findOne({ email });
  }

  public async createNew(userInfo: UserInfoDto): Promise<UsersModel> {
    const { password, email, firstName, lastName } = userInfo;
    const newUser = new this.usersRepo({
      password,
      email,
      firstName,
      lastName,
      photo: 'default.jpeg',
    });
    return newUser.save();
  }

  public async getRoomsById(_id: string): Promise<UsersModel | null> {
    return this.usersRepo.findById(_id, ['rooms', 'email']).populate([
      {
        path: 'rooms',
        model: ESchemasName.Rooms,
        select: ['_id'],
      },
    ]);
  }

  public async getList(
    id: string,
    start: number,
    howMany: number,
  ): Promise<UsersModel | null> {
    return this.usersRepo
      .findById(id, ['isOnline', 'firstName', 'lastName', 'photo'])
      .populate([
        {
          path: 'rooms',
          model: ESchemasName.Rooms,
          options: {
            skip: start,
            limit: howMany,
          },
          populate: [
            {
              path: 'users',
              model: ESchemasName.Users,
              match: { _id: { $ne: id } },
            },
            {
              path: 'messages',
              model: ESchemasName.Messages,
            },
          ],
        },
      ]);
  }

  public async checkRoom(_id, roomId): Promise<UsersModel | null> {
    return this.usersRepo.findById(_id).populate([
      {
        path: 'rooms',
        model: ESchemasName.Rooms,
        match: { _id: roomId },
        select: ['users'],
        populate: [
          {
            path: 'users',
            model: ESchemasName.Users,
            select: ['_id'],
            match: { _id: { $ne: _id } },
          },
        ],
      },
    ]);
  }

  public async deleteMessage(usersIds: string[], messageId: string) {
    return this.usersRepo.updateMany(
      { _id: { $in: usersIds } },
      {
        $pull: {
          messages: messageId,
          notRecived: messageId,
        },
      },
      { multi: true },
    );
  }

  public addMessage(members: string[], messageId) {
    return this.usersRepo.updateMany(
      {
        _id: { $in: members },
      },
      {
        $push: {
          notRecived: messageId.toString(),
          messages: messageId.toString(),
        },
      },
      { multi: true },
    );
  }
}
