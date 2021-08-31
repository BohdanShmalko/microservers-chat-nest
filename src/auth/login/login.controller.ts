import { LoginService } from './login.service';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { CheckEmailDto } from '../registration/dto/check-email.dto';
import { Response } from 'express';
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from '@shared/dto/message-response.dto';
import { SecretDto } from './dto/secret.dto';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({ summary: 'Check user id db' })
  @ApiResponse({ status: 200, type: () => MessageResponseDto })
  @Post()
  @HttpCode(200)
  checkUser(
    @Body() loginDataDto: LoginDataDto,
    @Res() res: Response,
  ): Promise<MessageResponseDto> {
    return this.loginService.checkUser(loginDataDto, res);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: () => MessageResponseDto })
  @Post('secret')
  @HttpCode(200)
  checkSecretKey(
    @Req() req: JwtRequestType,
    @Res() res: Response,
    @Body() loginData: SecretDto,
  ): Promise<MessageResponseDto> {
    return this.loginService.checkSecretKey(req, res, loginData);
  }
}
