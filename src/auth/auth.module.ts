import { Module } from '@nestjs/common';

import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { UsersModule } from '@db/users/users.module';
import { MailModule } from '@shared/mail/mail.module';
import { RegistrationService } from './registration/registration.service';
import { RegistrationController } from './registration/registration.controller';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';

@Module({
  imports: [AuthSharedModule, UsersModule, MailModule],
  providers: [RegistrationService, LoginService],
  controllers: [RegistrationController, LoginController],
})
export class AuthModule {}
