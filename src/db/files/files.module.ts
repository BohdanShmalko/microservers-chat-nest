import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { FilesService } from './files.service';
import { FilesSchema } from '@schemas/files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.Files, schema: FilesSchema },
    ]),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
