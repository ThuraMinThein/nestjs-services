import { Injectable } from '@nestjs/common';
import { CreateGenerateWordDto } from './dto/create-generate-word.dto';
import { UpdateGenerateWordDto } from './dto/update-generate-word.dto';

@Injectable()
export class GenerateWordService {
  create(createGenerateWordDto: CreateGenerateWordDto) {
    return 'This action adds a new generateWord';
  }

  findAll() {
    return `This action returns all generateWord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generateWord`;
  }

  update(id: number, updateGenerateWordDto: UpdateGenerateWordDto) {
    return `This action updates a #${id} generateWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} generateWord`;
  }
}
