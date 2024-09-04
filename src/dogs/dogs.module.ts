import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog } from './entities/dog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.services';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService, CloudinaryService],
})
export class DogsModule {}
