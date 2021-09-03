import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { RoomsSchema } from '@schemas/rooms.schema';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.Rooms, schema: RoomsSchema },
    ]),
  ],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
