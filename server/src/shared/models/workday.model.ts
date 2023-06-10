import { TimeSpan } from '@shared/custom/timeSpan';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.model';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type WorkdayDocument = HydratedDocument<Workday>;

@Schema()
export class Workday {
  _id: string | mongoose.Types.ObjectId;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: false })
  break: TimeSpan;

  @Prop({ required: false })
  note?: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | string;

  constructor(values: Workday) {
    this._id = values._id;
    this.start = values.start;
    this.end = values.end;
    this.break = values.break;
    this.note = values.note;
    this.user = values.user;
  }
}

export const WorkdaySchema = SchemaFactory.createForClass(Workday);
