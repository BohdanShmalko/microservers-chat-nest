import { HttpException, Injectable } from '@nestjs/common';

import { UsersService } from '@db/users/users.service';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { UsersModel } from '@schemas/users.schema';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { UserDto } from './dto/user.dto';

@Injectable()
export class FindService {
  constructor(private usersService: UsersService) {}

  public async findUser(req: JwtRequestType): Promise<UserDto> {
    const { _id } = req.jwtData;
    const user: UsersModel = await this.usersService.getById(_id);
    if (!user) throw new HttpException(EHttpExceptionMessage.Unauthorized, 400);

    return {
      id: _id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
    };
  }
}
