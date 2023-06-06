import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@shared/models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: UserDocument = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = new this.userModel(updateUserDto);
    updatedUser._id = id;
    return this.userModel.findOneAndUpdate({ _id: id }, updatedUser, { new: true }).exec();
  }

  remove(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
