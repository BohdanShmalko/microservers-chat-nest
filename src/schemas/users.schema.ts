import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsersModel {
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

  @Prop({ type: [String], required: true, default: [] })
  rooms: string[];
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isOnline: boolean;
  exitDate: number;
  photoName: string;
  rooms: string[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
