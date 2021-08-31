import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { FilesModel } from '@schemas/files.schema';
import { NotRecivedModel } from '@schemas/not-recived.schema';
import { MembersModel } from '@schemas/members.schema';

@Schema()
export class MessagesModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly _id?: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ESchemasName.Files,
  })
  file?: FilesModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  member: MembersModel;

  @Prop({ type: Number, default: Date.now, required: true })
  created: number;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.NotRecived,
      required: true,
    },
  ])
  notRecived: NotRecivedModel[];
}

export const MessagesSchema = SchemaFactory.createForClass(MessagesModel);
