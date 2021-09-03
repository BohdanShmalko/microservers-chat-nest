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
}
