import { Injectable } from '@nestjs/common';
import { CreateItemCountDto } from './dto/create-item-count.dto';
import { UpdateItemCountDto } from './dto/update-item-count.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCount } from './entities/item-count.entity';
import { Repository } from 'typeorm';
import { ItemCountGateWay } from './item-counts.gateway';

@Injectable()
export class ItemCountsService {
  constructor(
    @InjectRepository(ItemCount)
    private itemCountsRepository: Repository<ItemCount>,
    private readonly itemCountGateWay: ItemCountGateWay,
  ) {}

  async create(createItemCountDto: CreateItemCountDto) {
    const newItemCount = this.itemCountsRepository.create(createItemCountDto);
    return this.itemCountsRepository.save(newItemCount);
  }

  async findOne(id: number) {
    return this.itemCountsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async increaseCount(id: number) {
    const itemCount = await this.findOne(id);
    itemCount.count = itemCount.count + 1;
    const result = await this.itemCountsRepository.save(itemCount);
    this.itemCountGateWay.handleItemCountEvent(result);
    return result;
  }

  async decreaseCount(id: number) {
    const itemCount = await this.findOne(id);
    itemCount.count = itemCount.count - 1;
    const result = await this.itemCountsRepository.save(itemCount);
    this.itemCountGateWay.handleItemCountEvent(result);
    return result;
  }
}
