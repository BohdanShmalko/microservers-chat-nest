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
    });
    return newUser.save();
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
}
