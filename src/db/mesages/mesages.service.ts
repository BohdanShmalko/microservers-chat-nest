import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';

@Injectable()
export class MesagesService {
  constructor(
    @InjectModel(ESchemasName.Messages)
    private messagesRepo: Model<MessagesModel>,
  ) {}

  public async createNew(
    userId: string,
    message: string,
    roomId: string,
    notRecived: string[],
  ): Promise<MessagesModel> {
    const newMessage = new this.messagesRepo({
      user: userId,
      text: message,
      notRecived,
      room: roomId,
    });
    return newMessage.save();
  }

  public async deleteById(_id: string) {
    return this.messagesRepo.deleteOne({ _id });
  }

  public async getForDelete(
    messageId: string,
    userId: string,
  ): Promise<MessagesModel | null> {
    return this.messagesRepo.findById(messageId).populate([
      {
        path: 'room',
        model: ESchemasName.Rooms,
        select: ['users'],
        populate: [
          {
            path: 'users',
            model: ESchemasName.Users,
            select: ['_id'],
          },
        ],
      },
      {
        path: 'user',
        model: ESchemasName.Users,
        select: ['_id'],
        match: { _id: userId },
      },
    ]);
  }

  public async updateText(id: string, text: string) {
    return this.messagesRepo.updateOne({ _id: id }, { text });
  }
}
