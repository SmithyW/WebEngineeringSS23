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
  num: number;

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

  constructor(values: Contract) {
    this._id = values._id;
    this.num = values.num;
    this.begin = values.begin;
    this.end = values.end;
    this.weeklyTime = values.weeklyTime;
    this.timePerWeekday = values.timePerWeekday;
    this.supervisor = values.supervisor;
    this.user = values.user;
  }

  // Function to calculate and set weeklyTime from time values in timePerWeekday
  setWeeklyTime(): void {
    let wklyTime: number = 0;
    this.timePerWeekday.forEach((tpw) => {
      wklyTime += tpw.time;
    });
    this.weeklyTime = wklyTime;
  }
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
