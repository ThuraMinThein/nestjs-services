import { Test, TestingModule } from '@nestjs/testing';
import { ItemCountsController } from './item-counts.controller';
import { ItemCountsService } from './item-counts.service';

describe('ItemCountsController', () => {
  let controller: ItemCountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCountsController],
      providers: [ItemCountsService],
    }).compile();

    controller = module.get<ItemCountsController>(ItemCountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
