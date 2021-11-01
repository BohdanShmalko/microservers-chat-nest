import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { UsersModel } from '@schemas/users.schema';

@Schema()
export class RoomsModel {
  readonly _id?: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  status?: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ESchemasName.Messages }])
  messages: MessagesModel[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.Users,
      required: true,
    },
  ])
  users: UsersModel[];
}

export const RoomsSchema = SchemaFactory.createForClass(RoomsModel);
