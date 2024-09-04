import { Test, TestingModule } from '@nestjs/testing';
import { GenerateWordService } from './generate-word.service';

describe('GenerateWordService', () => {
  let service: GenerateWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateWordService],
    }).compile();

    service = module.get<GenerateWordService>(GenerateWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
