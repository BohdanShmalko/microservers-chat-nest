import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { RoomsModel } from '@schemas/rooms.schema';

@Injectable()
export class NotRecivedService {
  constructor(
    @InjectModel(ESchemasName.NotRecived)
    notRecivedRepo: Model<RoomsModel>,
  ) {}
}
