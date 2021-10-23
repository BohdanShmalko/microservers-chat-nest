import { Controller, HttpCode, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { JwtRequestType } from '@shared/types/jwt-request.type';
import { FindService } from './find.service';

@ApiTags('find')
@Controller('find')
export class FindController {
  constructor(private findService: FindService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Your JWT token',
  })
  @ApiOperation({ summary: 'Find user by Token' })
  @ApiResponse({ status: 200, type: () => UserDto })
  @Get()
  @Keys('_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  findUser(@Req() req: JwtRequestType): Promise<UserDto> {
    return this.findService.findUser(req);
  }
}
