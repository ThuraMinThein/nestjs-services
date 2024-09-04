import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { generateVerifyPassword } from './generateVerifyPassword.service';

@Injectable()
export class VerifyService {
  constructor(private config: ConfigService) {}

  async sendVerificationCode(phoneNumber: string) {
    const accountSid = this.config.get('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    const client = new Twilio(accountSid, authToken);

    const code = generateVerifyPassword();
    const message = await client.messages
      .create({
        body: `ဟေ့လူ ခင်ဗျားထည့်လိုက်တဲ့ ဖုန်းနံပါတ် မှန်၊မမှန် စစ်ဖို့အတွက် ဒီနံပါတ်ကိုရိုက်ထည့်။ သူများကို  ဒီနံပါတ်ပေးလိုက်ရင်တော့ သွားပြီပဲ ဘာမှမျှော်လင့်မနေနဲ့တော့။ 🫠 code : ${code}`,
        // from: this.config.get('TWILIO_PHONE_NUMBER'),
        to: phoneNumber,
        messagingServiceSid: 'MGa54dcfb2e04b33bf049c48bcf83d754f',
      })
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
