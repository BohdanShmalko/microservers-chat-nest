import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { ToDtoService } from './to-dto.service';
import { FilesSchema } from '@schemas/files.schema';

@Module({
  imports: [],
  providers: [ToDtoService],
  exports: [ToDtoService],
})
export class ToDtoModule {}
