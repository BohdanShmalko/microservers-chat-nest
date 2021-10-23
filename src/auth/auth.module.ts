import { Module } from '@nestjs/common';

import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { UsersModule } from '@db/users/users.module';
import { MailModule } from '@shared/mail/mail.module';
import { RegistrationService } from './registration/registration.service';
import { RegistrationController } from './registration/registration.controller';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { CheckController } from './check/check.controller';
import { FindService } from './find/find.service';
import { FindController } from './find/find.controller';

@Module({
  imports: [AuthSharedModule, UsersModule, MailModule],
  providers: [RegistrationService, LoginService, FindService],
  controllers: [RegistrationController, LoginController, CheckController, FindController],
})
export class AuthModule {}
