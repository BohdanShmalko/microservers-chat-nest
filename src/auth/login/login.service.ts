import { HttpException, Injectable } from '@nestjs/common';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { UsersService } from '@db/users/users.service';
import { MailService } from '@shared/mail/mail.service';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { SecretDto } from './dto/secret.dto';
import { TokenDto } from '../registration/dto/token.dto';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private authService: AuthSharedService,
  ) {}

  public async checkUser(loginDataDto: LoginDataDto): Promise<TokenDto> {
    const user = await this.usersService.getByEmail(loginDataDto.email);
    if (!user)
      throw new HttpException(
        EHttpExceptionMessage.InvalidEmailOrPassword,
        400,
      );
    const correctPassword = await this.authService.verify(
      loginDataDto.password,
      user.password,
    );
    if (!correctPassword)
      throw new HttpException(
        EHttpExceptionMessage.InvalidEmailOrPassword,
        400,
      );
    const secretKey: string = this.authService.generateSecretKey();
    const ectSecret = await this.authService.encrypt(secretKey);
    await this.mailService.sendUserConfirmation(user.email, secretKey);
    const token = this.authService.generateToken({
      secretKey: ectSecret,
      email: user.email,
    });
    return { token };
  }

  public async checkSecretKey(
    req: JwtRequestType,
    secretDto: SecretDto,
  ): Promise<TokenDto> {
    const { email, secretKey } = req.jwtData;
    const correctSecret = await this.authService.verify(
      secretDto.secretKey,
      secretKey,
    );
    if (!correctSecret)
      throw new HttpException(EHttpExceptionMessage.InvalidSecret, 400);
    const user = await this.usersService.getByEmail(email);
    if (!user) throw new HttpException(EHttpExceptionMessage.InvalidEmail, 400);
    const token = this.authService.generateToken({ _id: user._id });
    return { token };
  }
}
