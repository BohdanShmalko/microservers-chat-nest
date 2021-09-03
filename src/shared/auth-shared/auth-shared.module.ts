import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthSharedService } from './auth-shared.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('SECRET_KEY'),
      }),
    }),
  ],
  providers: [AuthSharedService],
  exports: [AuthSharedService, JwtModule],
})
export class AuthSharedModule {}
