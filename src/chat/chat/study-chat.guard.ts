import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MIDDLE_KEYS } from '@shared/auth-shared/middle-keys.decorator';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { Socket } from 'socket.io';
import { AuthSharedService } from '@shared/auth-shared/auth-shared.service';
import { JwtSocketType } from '@shared/types/jwt-socket.type';

@Injectable()
export class StudyChatGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthSharedService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: JwtSocketType = context.switchToHttp().getRequest();
    try {
      const keys = this.reflector.getAllAndOverride(MIDDLE_KEYS, [
        context.getHandler(),
        context.getClass(),
      ]);
      const jwtData = await this.authService.getJwtData(client.handshake.auth);
      const jwtKeys = Object.keys(jwtData);
      if (keys && this.authService.diff(jwtKeys, keys).length) {
        client.emit('error', {
          message: EHttpExceptionMessage.Unauthorized,
        });
        return false;
      }
      client.jwtData = jwtData;
      return true;
    } catch (e) {
      client.emit('error', {
        message: EHttpExceptionMessage.Unauthorized,
      });
      return false;
    }
  }

  private parseCookie(rawCookie: string) {
    return rawCookie
      .split('; ')
      .find((cookie: string) => cookie.startsWith('session'))
      .split('=')[1];
  }
}
