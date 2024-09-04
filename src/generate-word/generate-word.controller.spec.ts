import { Test, TestingModule } from '@nestjs/testing';
import { GenerateWordController } from './generate-word.controller';
import { GenerateWordService } from './generate-word.service';

describe('GenerateWordController', () => {
  let controller: GenerateWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateWordController],
      providers: [GenerateWordService],
    }).compile();

    controller = module.get<GenerateWordController>(GenerateWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
