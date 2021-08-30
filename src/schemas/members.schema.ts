import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { UsersModel } from '@schemas/users.schema';
import { RoomsModel } from '@schemas/rooms.schema';
import { NotRecivedModel } from '@schemas/not-recived.schema';

@Schema()
export class MembersModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly _id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: UsersModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  room: RoomsModel;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.Messages,
      required: true,
    },
  ])
  messages: MessagesModel[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.NotRecived,
      required: true,
    },
  ])
  notRecived: NotRecivedModel[];
}

export const MembersSchema = SchemaFactory.createForClass(MembersModel);
