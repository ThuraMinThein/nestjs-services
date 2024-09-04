import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerateWordService } from './generate-word.service';
import { CreateGenerateWordDto } from './dto/create-generate-word.dto';
import { UpdateGenerateWordDto } from './dto/update-generate-word.dto';

@Controller('generate-word')
export class GenerateWordController {
  constructor(private readonly generateWordService: GenerateWordService) {}

  @Post()
  create(@Body() createGenerateWordDto: CreateGenerateWordDto) {
    return this.generateWordService.create(createGenerateWordDto);
  }

  @Get()
  findAll() {
    return this.generateWordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generateWordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenerateWordDto: UpdateGenerateWordDto) {
    return this.generateWordService.update(+id, updateGenerateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generateWordService.remove(+id);
  }
}
