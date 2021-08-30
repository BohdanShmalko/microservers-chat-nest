import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';

@Schema()
export class FilesModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ESchemasName.Messages,
      required: true,
    },
  ])
  messages: MessagesModel[];
}

export const FilesSchema = SchemaFactory.createForClass(FilesModel);
