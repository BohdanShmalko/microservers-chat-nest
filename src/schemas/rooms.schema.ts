import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessagesModel, MessagesSchema } from './messages.schema';

@Schema()
export class RoomsModel {
  @Prop({ type: [String], required: true, default: [] })
  users: string[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: [MessagesSchema], default: [] })
  messages: MessagesModel[];
}

export const RoomsSchema = SchemaFactory.createForClass(RoomsModel);
