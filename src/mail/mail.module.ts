import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'thur7012@gmail.com',
          pass: 'trmt1212',
        },
      },
      defaults: {
        from: '"nest-modules" <thur7012@gmail.com>',
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
