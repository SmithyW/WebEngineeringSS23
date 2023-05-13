import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: string | mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  constructor(values: User) {
    this._id = values._id;
    this.name = values.name;
    this.email = values.email;
    this.phone = this.phone;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
