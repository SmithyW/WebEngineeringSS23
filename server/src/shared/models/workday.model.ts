import { TimeSpan } from "@shared/custom/timeSpan";
import mongoose from 'mongoose';
import { IUser } from "./user.model";

/**
 * Represents one day of work
 */
export interface IWorkday {
    _id: string;
    start: Date;
    end: Date;
    break: TimeSpan;
    note: string;
    user: IUser | string;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    break: { type: TimeSpan },
    note: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
})

type WorkdayType = IWorkday & mongoose.Document;

export default mongoose.model<WorkdayType>('Workday', _schema);