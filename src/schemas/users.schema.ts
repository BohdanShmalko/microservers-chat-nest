import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MembersModel } from '@schemas/members.schema';

@Schema()
export class UsersModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  readonly id?: string;

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
  photoName: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ESchemasName.Members }])
  members: MembersModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
