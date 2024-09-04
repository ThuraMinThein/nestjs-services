import { Module } from '@nestjs/common';
import { GenerateWordService } from './generate-word.service';
import { GenerateWordController } from './generate-word.controller';

@Module({
  controllers: [GenerateWordController],
  providers: [GenerateWordService],
})
export class GenerateWordModule {}
