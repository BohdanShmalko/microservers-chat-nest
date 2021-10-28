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

  public async getMessages(
    userId: string,
    roomId: string,
    start: number,
    howMany: number,
  ): Promise<RoomsModel | null> {
    return this.roomsRepo.findById(roomId).populate([
      {
        path: 'users',
        model: ESchemasName.Users,
        match: { _id: userId },
      },
      {
        path: 'messages',
        model: ESchemasName.Messages,
        options: {
          skip: start,
          limit: howMany,
        },
        populate: [
          {
            path: 'user',
            model: ESchemasName.Users,
            select: ['photo'],
          },
        ],
      },
    ]);
  }

  public async createRoom(
    users: string[],
    name?: string,
    photo?: string,
  ): Promise<RoomsModel | null> {
    const newRoom = new this.roomsRepo({
      users,
      name,
      photo: photo || (name ? 'default.jpeg' : undefined),
      messages: [],
      time: Date.now(),
    });
    const room = await newRoom.save();
    return room.populate({
      path: 'users',
      model: ESchemasName.Users,
    });
  }

  public async getMessagesCount(roomId: string): Promise<RoomsModel | null> {
    return this.roomsRepo.findById(roomId);
  }

  public async addMessage(roomId: string, messageId) {
    return this.roomsRepo.updateOne(
      { _id: roomId },
      {
        $push: {
          messages: messageId.toString(),
        },
      },
    );
  }

  public async deleteMessage(roomId: string, messageId) {
    return this.roomsRepo.updateOne(
      { _id: roomId },
      {
        $pull: {
          messages: messageId.toString(),
        },
      },
    );
  }
}
