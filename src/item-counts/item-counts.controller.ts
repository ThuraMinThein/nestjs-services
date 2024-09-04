import {
  Post,
  Body,
  Patch,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemCountsService } from './item-counts.service';
import { CreateItemCountDto } from './dto/create-item-count.dto';

@Controller('item-counts')
export class ItemCountsController {
  constructor(private readonly itemCountsService: ItemCountsService) {}

  @Post()
  create(@Body() createItemCountDto: CreateItemCountDto) {
    return this.itemCountsService.create(createItemCountDto);
  }

  @Patch('increase/:id')
  increaseCount(@Param('id', ParseIntPipe) id: number) {
    return this.itemCountsService.increaseCount(id);
  }

  @Patch('decrease/:id')
  decreaseCount(@Param('id', ParseIntPipe) id: number) {
    return this.itemCountsService.decreaseCount(id);
  }
}
