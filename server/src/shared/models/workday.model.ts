import { TimeSpan } from "@shared/custom/timeSpan";
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from "./user.model";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { EWeekday } from "@shared/enums/weekday.enum";

export type WorkdayDocument = HydratedDocument<Workday>;

@Schema()
export class Workday {
    @Prop({ required: true })
    day: EWeekday;

    @Prop({ required: true })
    time: TimeSpan;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User | string;    
}

export const WorkdaySchema = SchemaFactory.createForClass(Workday);