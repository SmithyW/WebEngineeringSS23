import mongoose from 'mongoose';
import { IUser } from './user.model';
import { EWeekday } from '@shared/enums/weekday.enum';

/**
 * Represents a configuration element in a contract, which defines the planned working hours on a weekday
 */
export interface IWorkdayTime {
  day: EWeekday;
  time: number;
}

/**
 * Represents a Contract and its default working time agreement
 */
export interface IContract {
  _id: string;
  num: number;
  begin: Date;
  end: Date;
  weeklyTime: number;
  timePerWeekday: IWorkdayTime;
  supervisor: IUser | string;
  user: IUser | string;
}

const workdayTimeSchema: mongoose.Schema = new mongoose.Schema(
  {
    day: { type: EWeekday, required: true },
    time: { type: Number, required: true },
  },
  { _id: false },
);

const _schema: mongoose.Schema = new mongoose.Schema({
  num: { type: Number, required: true, unique: true },
  begin: { type: Date, required: true },
  end: { type: Date, required: true },
  weeklyTime: { type: Number, required: true },
  timePerWeekday: { type: [workdayTimeSchema], required: true, minLength: 1 },
  supervisor: { type: mongoose.Types.ObjectId, ref: 'User' },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

type ContractType = IContract & mongoose.Document;

export default mongoose.model<ContractType>('Contract', _schema);
