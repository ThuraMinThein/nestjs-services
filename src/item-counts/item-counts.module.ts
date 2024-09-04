import { Module } from '@nestjs/common';
import { ItemCountsService } from './item-counts.service';
import { ItemCountsController } from './item-counts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCount } from './entities/item-count.entity';
import { ItemCountGateWay } from './item-counts.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCount])],
  controllers: [ItemCountsController],
  providers: [ItemCountsService, ItemCountGateWay],
  exports: [ItemCountsService],
})
export class ItemCountsModule {}
