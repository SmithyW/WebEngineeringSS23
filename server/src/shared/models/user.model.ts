import mongoose from 'mongoose';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
}

const _schema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String
})

type UserType = IUser & mongoose.Document;

export default mongoose.model<UserType>('User', _schema);
