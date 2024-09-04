import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail() {
    this.mailerService.sendMail({
      to: 'trmt1212@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b><br><p>Why do people want the things they can have</p>',
    });
  }
}
