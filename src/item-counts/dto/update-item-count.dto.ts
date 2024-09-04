import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCountDto } from './create-item-count.dto';

export class UpdateItemCountDto extends PartialType(CreateItemCountDto) {}
