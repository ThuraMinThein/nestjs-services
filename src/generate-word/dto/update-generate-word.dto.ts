import { PartialType } from '@nestjs/mapped-types';
import { CreateGenerateWordDto } from './create-generate-word.dto';

export class UpdateGenerateWordDto extends PartialType(CreateGenerateWordDto) {}
