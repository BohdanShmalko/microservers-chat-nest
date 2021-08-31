import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { UsersModel } from '@schemas/users.schema';

@Schema()
export class NotRecivedModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly _id?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ESchemasName.Users,
    required: true,
  })
  user: UsersModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ESchemasName.Messages,
    required: true,
  })
  message: MessagesModel;
}

export const NotRecivedSchema = SchemaFactory.createForClass(NotRecivedModel);
