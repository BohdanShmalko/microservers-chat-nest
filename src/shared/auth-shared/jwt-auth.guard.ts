import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EHttpExceptionMessage } from '../exceptions/http.exception';
import { AuthSharedService } from './auth-shared.service';
import { MIDDLE_KEYS } from './middle-keys.decorator';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthSharedService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // const client: Socket = context.switchToWs().getClient();
    try {
      // const sessionCookie = client.handshake.headers.cookie;
      // .split('; ')
      // .find((cookie: string) => cookie.startsWith('session'))
      // .split('=')[1];
      // console.log(sessionCookie);
      const keys = this.reflector.getAllAndOverride(MIDDLE_KEYS, [
        context.getHandler(),
        context.getClass(),
      ]);
      const jwtData = await this.authService.getJwtData(req);
      const jwtKeys = Object.keys(jwtData);
      if (keys && this.diff(jwtKeys, keys).length) throw '';
      req.jwtData = jwtData;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: EHttpExceptionMessage.Unauthorized,
      });
    }
  }

  private diff(a1, a2) {
    return a1
      .filter((i) => !a2.includes(i))
      .concat(a2.filter((i) => !a1.includes(i)));
  }
}
