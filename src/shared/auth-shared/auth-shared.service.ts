import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';

@Injectable()
export class AuthSharedService {
  constructor(private jwtService: JwtService) {}

  public async getJwtData(
    req: Request,
  ): Promise<{ id: number; secretKey?: string }> {
    const { token } = req.cookies;
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
    const token = this.jwtService.sign(payload);
    //res.cookie('token', token);
    return token;
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
}
