import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  mailTransport() {
    // const transporter = nodemailer.createTransport({
    //     host: '',
    //     port: 465,
    //     auth{
    //         user:'',
    //         pass:'',
    //     }
    // });
  }
}
