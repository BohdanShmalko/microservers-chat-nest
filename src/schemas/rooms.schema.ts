import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MembersModel } from '@schemas/members.schema';

@Schema()
export class RoomsModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly id?: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  photo: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ESchemasName.Members }])
  members: MembersModel[];
}

export const RoomsSchema = SchemaFactory.createForClass(RoomsModel);
