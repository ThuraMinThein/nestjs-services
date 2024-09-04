import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/configs/typeorm.config';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { ItemCountsModule } from './item-counts/item-counts.module';
import { MailerModule } from './mailer/mailer.module';
import { CertificatesModule } from './certificates/certificates.module';
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
    ItemCountsModule,
    MailerModule,
    CertificatesModule,
  ],
})
export class AppModule {}
