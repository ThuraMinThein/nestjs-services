import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GROUP_USER } from 'src/utils/group.sealizer';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Dog } from './entities/dog.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { events } from '../constants/event.constant';

@Controller('dogs')
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  @Post()
  create(
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createDogDto: CreateDogDto,
  ) {
    this.eventEmitter.emit(events.CREATED_DOG, req.user);
    return this.dogsService.create(req.user, image, createDogDto);
  }

  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  @Get()
  async findAll(
    @Query('p') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<Dog>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.dogsService.paginate(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.dogsService.findOne(req.user, +id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    return this.dogsService.update(req.user, +id, image, updateDogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.dogsService.remove(req.user, +id);
  }
}
