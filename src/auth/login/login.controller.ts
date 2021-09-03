import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginService } from './login.service';
import { LoginDataDto } from './dto/login-data.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { SecretDto } from './dto/secret.dto';
import { TokenDto } from '../registration/dto/token.dto';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({ summary: 'Check user id db' })
  @ApiResponse({ status: 200, type: () => TokenDto })
  @Post()
  @HttpCode(200)
  checkUser(@Body() loginDataDto: LoginDataDto): Promise<TokenDto> {
    return this.loginService.checkUser(loginDataDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: () => TokenDto })
  @Post('secret')
  @Keys('email', 'secretKey')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  checkSecretKey(
    @Req() req: JwtRequestType,
    @Body() loginData: SecretDto,
  ): Promise<TokenDto> {
    return this.loginService.checkSecretKey(req, loginData);
  }
}
