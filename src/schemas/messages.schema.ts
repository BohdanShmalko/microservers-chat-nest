import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { FilesModel } from '@schemas/files.schema';
import { UsersModel } from '@schemas/users.schema';
import { RoomsModel } from '@schemas/rooms.schema';

@Schema()
export class MessagesModel {
  readonly _id?: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({
    type: FilesModel,
  })
  file?: FilesModel;

  @Prop({ type: Number, default: Date.now, required: true })
  created: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: UsersModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  room: RoomsModel;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.Users,
      required: true,
    },
  ])
  notRecived: UsersModel[];
}

export const MessagesSchema = SchemaFactory.createForClass(MessagesModel);
