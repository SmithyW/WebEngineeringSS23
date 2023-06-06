import { Injectable } from '@nestjs/common';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workday, WorkdayDocument } from '@shared/models/workday.model';
import { Model } from 'mongoose';

@Injectable()
export class WorkdayService {

  constructor(@InjectModel(Workday.name) private workdayModel: Model<Workday>) {}

  create(createWorkdayDto: CreateWorkdayDto): Promise<Workday> {
    const createdWorkday: WorkdayDocument = new this.workdayModel(createWorkdayDto);
    return createdWorkday.save();
  }

  findAll(filter: any): Promise<Workday[]> {
    return this.workdayModel.find(filter).populate('user').exec();
  }

  findOne(id: string): Promise<Workday> {
    return this.workdayModel.findOne({ _id: id }).populate('user').exec();
  }

  update(id: string, updateWorkdayDto: UpdateWorkdayDto): Promise<Workday> {
    const updatedWorkday = new this.workdayModel(updateWorkdayDto);
    updatedWorkday._id = id;
    return this.workdayModel.findOneAndUpdate({ _id: id }, updatedWorkday, { new: true }).exec();
  }

  remove(id: string): Promise<any> {
    return this.workdayModel.deleteOne({ _id: id }).exec();
  }
}
