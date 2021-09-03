import { HttpException, Injectable } from '@nestjs/common';

import { CheckEmailDto } from './dto/check-email.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UsersService } from '@db/users/users.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { MailService } from '@shared/mail/mail.service';
import { UsersModel } from '@schemas/users.schema';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private authService: AuthSharedService,
  ) {}

  public async checkEmail(checkEmailDto: CheckEmailDto): Promise<TokenDto> {
    const { email } = checkEmailDto;
    const user: UsersModel = await this.usersService.getByEmail(email);
    if (user) throw new HttpException(EHttpExceptionMessage.IsExist, 400);
    const secretKey: string = this.authService.generateSecretKey();
    await this.mailService.sendUserConfirmation(email, secretKey);
    const ectSecret = await this.authService.encrypt(secretKey);
    const token = this.authService.generateToken({
      email,
      secretKey: ectSecret,
    });
    return { token };
  }

  public async createNewUser(req, userInfo: UserInfoDto): Promise<TokenDto> {
    const { email, secretKey } = req.jwtData;
    if (email !== userInfo.email)
      throw new HttpException(EHttpExceptionMessage.InvalidEmail, 400);
    const validSecret: boolean = await this.authService.verify(
      userInfo.secretKey,
      secretKey,
    );
    if (email !== userInfo.email || !validSecret)
      throw new HttpException(EHttpExceptionMessage.InvalidSecret, 400);
    const user: UsersModel = await this.usersService.getByEmail(email);
    if (user) throw new HttpException(EHttpExceptionMessage.IsExist, 400);
    const encPass = await this.authService.encrypt(userInfo.password);
    const { _id } = await this.usersService.createNew({
      ...userInfo,
      password: encPass,
    });
    const token = this.authService.generateToken({ _id });

    return { token };
  }
}
