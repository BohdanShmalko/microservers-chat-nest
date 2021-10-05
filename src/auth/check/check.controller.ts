import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Keys } from '@shared/auth-shared/middle-keys.decorator';
import { JwtAuthGuard } from '@shared/auth-shared/jwt-auth.guard';
import { MessageResponseDto } from '@shared/dto/message-response.dto';

@ApiHeader({
  name: 'Authorization',
  description: 'Your JWT token',
})
@ApiTags('check')
@Controller('check')
export class CheckController {
  @ApiOperation({ summary: 'Check user auth token' })
  @ApiResponse({ status: 200, type: () => MessageResponseDto })
  @Get('auth')
  @Keys('email', 'secretKey')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  checkAuth(): MessageResponseDto {
    return { message: 'ok' };
  }

  @ApiOperation({ summary: 'Check user fix token' })
  @ApiResponse({ status: 200, type: () => MessageResponseDto })
  @Get('fix')
  @Keys('_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  checkFix(): MessageResponseDto {
    return { message: 'ok' };
  }
}
