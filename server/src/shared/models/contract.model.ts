import mongoose = require("mongoose");
import { IUser } from "./user.model";

export interface IContract {
    _id: string;
    num: number;
    begin: Date;
    end: Date;
    supervisor: IUser | string;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    num: { type: Number, required: true, unique: true },
    begin: { type: Date, required: true },
    end: { type: Date, required: true },
    supervisor: { type: mongoose.Types.ObjectId, ref: 'User' }
});

type ContractType = IContract & mongoose.Document;

export default mongoose.model<ContractType>('Contract', _schema);
