/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWorkdayTime } from '@shared/interfaces/workdayTime.interface';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.model';

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {
  _id: string | mongoose.Types.ObjectId;

  @Prop({ required: true })
  begin: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  weeklyTime: number;

  @Prop({ required: true })
  timePerWeekday: IWorkdayTime[];

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  supervisor?: User | string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | string;

  constructor(
    _id: string | mongoose.Types.ObjectId,
    begin: Date,
    end: Date,
    weeklyTime: number,
    timePerWeekday: [IWorkdayTime],
    user: User | string,
    supervisor: User | string | undefined = undefined,
  ) {
    this._id = _id;
    this.begin = begin;
    this.end = end;
    this.weeklyTime = weeklyTime;
    this.timePerWeekday = timePerWeekday;
    this.supervisor = supervisor;
    this.user = user;
  }
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
