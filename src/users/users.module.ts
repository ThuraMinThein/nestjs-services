import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VerifyService } from '../services/phone verify/verify.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EventEmitterModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, VerifyService],
  exports: [UsersService],
})
export class UsersModule {}
