import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { Model } from 'mongoose';
import { UsersModel } from '@schemas/users.schema';
import { UserInfoDto } from '../../auth/registration/dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ESchemasName.Users)
    private usersRepo: Model<UsersModel>,
  ) {}

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
    });
    return newUser.save();
  }

  public async getListById(
    id: string,
    start: number,
    howMany: number,
  ): Promise<UsersModel | null> {
    return this.usersRepo
      .findById(id, ['isOnline', 'firstName', 'lastName', 'photo'])
      .populate([
        {
          path: 'members',
          select: ['room'],
          model: ESchemasName.Members,
          options: {
            skip: start,
            limit: howMany,
          },
          populate: [
            {
              select: ['photo', 'name', 'members'],
              path: 'room',
              model: ESchemasName.Rooms,
              populate: [
                {
                  path: 'members',
                  model: ESchemasName.Members,
                  match: { _id: { $ne: '102790505d6692dc25726762' } },
                  populate: [
                    {
                      path: 'user',
                      model: ESchemasName.Users,
                    },
                  ],
                },
              ],
            },
            {
              select: ['id'],
              path: 'notRecived',
              model: ESchemasName.NotRecived,
            },
            {
              path: 'messages',
              model: ESchemasName.Messages,
              options: {
                limit: 1,
              },
            },
          ],
        },
      ]);
  }
}
