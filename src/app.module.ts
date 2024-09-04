import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/configs/typeorm.config';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { ItemCountsModule } from './item-counts/item-counts.module';
import { MailerModule } from './mailer/mailer.module';
import { GenerateWordModule } from './generate-word/generate-word.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    DogsModule,
    AuthModule,
    FileuploadModule,
    MailModule,
    ItemCountsModule,
    MailerModule,
    GenerateWordModule,
  ],
})
export class AppModule {}
