import { Injectable } from '@nestjs/common';
import { CheckEmailDto } from './dto/check-email.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UsersService } from '@db/users/users.service';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { MailService } from '@shared/mail/mail.service';
import { UsersModel } from '@schemas/users.schema';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';

@Injectable()
export class RegistrationService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private authService: AuthSharedService,
  ) {}

  public async checkEmail(checkEmailDto: CheckEmailDto, res): Promise<void> {
    const { email } = checkEmailDto;
    const user: UsersModel = await this.usersService.getByEmail(email);
    if (user)
      return res.status(400).send({ message: EHttpExceptionMessage.IsExist });
    const secretKey: string = this.authService.generateSecretKey();
    await this.mailService.sendUserConfirmation(email, secretKey);
    const ectSecret = await this.authService.encrypt(secretKey);
    const token = this.authService.generateToken(
      {
        email,
        secretKey: ectSecret,
      },
      res,
    );
    return res.status(400).send({ token });
  }

  public async createNewUser(req, res, userInfo: UserInfoDto): Promise<void> {
    const { email, secretKey } = req.jwtData;
    if (email !== userInfo.email)
      return res
        .status(400)
        .send({ message: EHttpExceptionMessage.InvalidEmail });
    const validSecret: boolean = await this.authService.verify(
      userInfo.secretKey,
      secretKey,
    );
    if (email !== userInfo.email || !validSecret)
      return res
        .status(400)
        .send({ message: EHttpExceptionMessage.InvalidSecret });
    const user: UsersModel = await this.usersService.getByEmail(email);
    if (user)
      return res.status(400).send({ message: EHttpExceptionMessage.IsExist });
    const encPass = await this.authService.encrypt(userInfo.password);
    const { _id } = await this.usersService.createNew({
      ...userInfo,
      password: encPass,
    });
    this.authService.generateToken({ _id }, res);

    return res.status(400).send({ message: 'ok' });
  }
}
