import { Test, TestingModule } from '@nestjs/testing';
import { ItemCountsService } from './item-counts.service';

describe('ItemCountsService', () => {
  let service: ItemCountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCountsService],
    }).compile();

    service = module.get<ItemCountsService>(ItemCountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
