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
}
