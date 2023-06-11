import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import mongoose, { HydratedDocument } from 'mongoose';

export type SignedMonthDocument = HydratedDocument<SignedMonth>;

@Schema()
export class SignedMonth {
  _id: string | mongoose.Types.ObjectId;

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  objectHash: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | string;

  constructor(values: SignedMonth) {
    this._id = values._id;
    this.month = values.month;
    this.year = values.year;
    this.objectHash = values.objectHash;
    this.user = values.user;
  }
}

export const SignedMonthSchema = SchemaFactory.createForClass(SignedMonth);
SignedMonthSchema.index({ month: 1, year: 1 }, { unique: true });
