import { Injectable } from '@nestjs/common';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workday, WorkdayDocument } from '@shared/models/workday.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class WorkdayService {
  constructor(
    @InjectModel(Workday.name) private workdayModel: Model<Workday>,
  ) {}

  create(createWorkdayDto: CreateWorkdayDto): Promise<Workday> {
    const createdWorkday: WorkdayDocument = new this.workdayModel(createWorkdayDto);
    return createdWorkday.save();
  }

  findAll(filter: { user?: string, month?: number, year?: number }): Promise<Workday[]> {
    const mongoQueryFilter: any = {
      $and: []
    };
    if (filter.user) {
      mongoQueryFilter.$and.push({
        user: new Types.ObjectId(filter.user),
      });
    }

    if (filter.year) {
      let exprArr = { $and: [] };
      const exprYear = { $eq: [{ $year: '$start' }, filter.year] };
      exprArr.$and.push(exprYear);

      let exprMonth = null;

      if (filter.month) {
        exprMonth = { $eq: [{ $month: '$start' }, filter.month] };
        exprArr = exprMonth;
      }

      mongoQueryFilter.$and.push({
        $expr: exprArr,
      });
    }
    return this.workdayModel.find(mongoQueryFilter).populate('user').exec();
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
