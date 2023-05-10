import mongoose = require("mongoose");

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String
})

type UserType = IUser & mongoose.Document;

export default mongoose.model<UserType>('User', _schema);