import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { JwtSocketType } from '@shared/types/jwt-socket.type';
import { CStudyChatConfig } from '../../chat/chat/study-chat.config';

@Injectable()
export class AuthSharedService {
  constructor(private jwtService: JwtService) {}

  public async getJwtData(
    cookies,
  ): Promise<{ _id: string; secretKey?: string; email?: string }> {
    const { token } = cookies;
    console.log(cookies);
    if (!token) throw '';
    return this.jwtService.verify(token);
  }

  public verify(entered: string, old: string): Promise<boolean> {
    return bcrypt.compare(entered, old);
  }

  public encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 5);
  }

  public generateToken(payload): string {
    return this.jwtService.sign(payload);
  }

  public generateSecretKey(SECRET_LENGTH = 6): string {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(SECRET_LENGTH, (Math.random() * 10).toFixed());
  }

  public stringIdToInt(stringId: string) {
    const id = Number(stringId);
    if (isNaN(id) || !Number.isInteger(id))
      throw new HttpException(EHttpExceptionMessage.IdType, 400);
    return id;
  }

  public diff(a1, a2) {
    return a1
      .filter((i) => !a2.includes(i))
      .concat(a2.filter((i) => !a1.includes(i)));
  }

  public wsError(client: JwtSocketType, message): void {
    client.emit(CStudyChatConfig.client.error, message);
    return;
  }
}
