import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { TokenDto } from './dto/token.dto';

@ApiTags('registration')
@Controller('register')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @ApiOperation({ summary: 'Check email' })
  @ApiResponse({ status: 200, type: () => TokenDto })
  @Post()
  @HttpCode(200)
  checkEmail(@Body() checkEmailDto: CheckEmailDto): Promise<TokenDto> {
    return this.registrationService.checkEmail(checkEmailDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Your JWT token',
  })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: () => TokenDto })
  @Keys('email', 'secretKey')
  @UseGuards(JwtAuthGuard)
  @Post('secret')
  @HttpCode(200)
  createNewUser(
    @Req() req: JwtRequestType,
    @Body() userInfo: UserInfoDto,
  ): Promise<TokenDto> {
    return this.registrationService.createNewUser(req, userInfo);
  }
}
