import { Injectable } from '@nestjs/common';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { UsersService } from '@db/users/users.service';
import { MailService } from '@shared/mail/mail.service';
import { CheckEmailDto } from '../registration/dto/check-email.dto';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { MessageResponseDto } from '@shared/dto/message-response.dto';
import { SecretDto } from './dto/secret.dto';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private authService: AuthSharedService,
  ) {}

  public async checkUser(
    loginDataDto: LoginDataDto,
    res,
  ): Promise<MessageResponseDto> {
    return;
  }

  public async checkSecretKey(
    req: JwtRequestType,
    res,
    loginDataDto: SecretDto,
  ): Promise<MessageResponseDto> {
    return;
  }
}
