import { TimeSpan } from "@shared/custom/timeSpan";
import mongoose = require("mongoose");

/**
 * Represents one day of work
 */
export interface IWorkday {
    _id: string;
    start: Date;
    end: Date;
    break: TimeSpan;
    note: String;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    break: { type: TimeSpan },
    note: { type: String },
})

type WorkdayType = IWorkday & mongoose.Document;

export default mongoose.model<WorkdayType>('Workday', _schema);