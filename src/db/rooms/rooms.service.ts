import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { RoomsModel } from '@schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(ESchemasName.Rooms)
    private roomsRepo: Model<RoomsModel>,
  ) {}

  public async getByIds(ids: { id: string }[]): Promise<RoomsModel[] | null> {
    return this.roomsRepo.find({ $or: ids });
  }
}
