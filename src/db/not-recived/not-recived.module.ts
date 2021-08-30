import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { RoomsSchema } from '@schemas/rooms.schema';
import { NotRecivedService } from './not-recived.service';
import { NotRecivedSchema } from '@schemas/not-recived.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.NotRecived, schema: NotRecivedSchema },
    ]),
  ],
  providers: [NotRecivedService],
  exports: [NotRecivedService],
})
export class NotRecivedModule {}
