import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    _id: string | mongoose.Types.ObjectId;
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);