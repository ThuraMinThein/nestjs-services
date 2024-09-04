import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';

@Module({
  providers: [FileuploadService]
})
export class FileuploadModule {}
