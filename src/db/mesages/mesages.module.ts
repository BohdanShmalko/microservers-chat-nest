import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { MesagesService } from './mesages.service';
import { MessagesSchema } from '@schemas/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.Messages, schema: MessagesSchema },
    ]),
  ],
  providers: [MesagesService],
  exports: [MesagesService],
})
export class MesagesModule {}
