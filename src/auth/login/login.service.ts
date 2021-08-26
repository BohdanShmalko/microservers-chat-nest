import { Injectable } from '@nestjs/common';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { UsersService } from '@db/users/users.service';
import { MailService } from '@shared/mail/mail.service';
import { CheckEmailDto } from '../registration/dto/check-email.dto';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private authService: AuthSharedService,
  ) {}

  public async checkUser(checkEmailDto: CheckEmailDto, res): Promise<void> {
    return;
  }

  public async checkSecretKey(
    req: JwtRequestType,
    res,
    loginDataDto: LoginDataDto,
  ): Promise<void> {
    return;
  }
}
