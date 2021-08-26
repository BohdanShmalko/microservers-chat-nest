import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MessagesModel {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String })
  fileName: string;

  @Prop({ type: String, required: true })
  senderId: string;

  @Prop({ type: [String], required: true, default: [] })
  receivedFor: string[];

  @Prop({ type: Number, default: Date.now, required: true })
  created: number;
}

export const MessagesSchema = SchemaFactory.createForClass(MessagesModel);
