import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, secretKey: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your secret key for chat',
      template: './confirmation',
      context: {
        secretKey,
      },
    });
  }
}
