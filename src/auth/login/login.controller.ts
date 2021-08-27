import { LoginService } from './login.service';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { CheckEmailDto } from '../registration/dto/check-email.dto';
import { Response } from 'express';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  checkUser(data: {
    checkEmailDto: CheckEmailDto;
    res: Response;
  }): Promise<void> {
    return this.loginService.checkUser(data.checkEmailDto, data.res);
  }

  checkSecretKey(data: {
    req: JwtRequestType;
    res: Response;
    loginData: LoginDataDto;
  }): Promise<void> {
    return this.loginService.checkSecretKey(data.req, data.res, data.loginData);
  }
}
