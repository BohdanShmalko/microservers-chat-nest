import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { RoomsModel } from '@schemas/rooms.schema';

@Schema()
export class UsersModel {
  readonly _id?: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, required: true, default: false })
  isOnline: boolean;

  @Prop({ type: Number, required: true, default: Date.now })
  exitDate: number;

  @Prop({ type: String })
  photo: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ESchemasName.Messages }])
  messages: MessagesModel[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ESchemasName.Messages }])
  notRecived: MessagesModel[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.Rooms,
      required: true,
    },
  ])
  rooms: RoomsModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
