import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';

@Injectable()
export class MesagesService {
  constructor(
    @InjectModel(ESchemasName.Messages)
    messagesRepo: Model<MessagesModel>,
  ) {}
}
