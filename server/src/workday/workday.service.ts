import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workday, WorkdayDocument } from '@shared/models/workday.model';
import { Model, Types } from 'mongoose';
import { hash } from 'object-hash';
import { SignedMonthDto } from '../signed-month/dto/sign-request.dto';
import { SignedMonthService } from 'src/signed-month/signed-month.service';

@Injectable()
export class WorkdayService {
  @Inject()
  private signedMonthService: SignedMonthService;

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

  async sign(user: string, month: number, year: number): Promise<{ success: boolean, message?: string }> {
    const today: Date = new Date(Date.now());
    const monthToSign: Date = new Date(year, month + 1, 0);

    if (today <= monthToSign) {
      return new Promise((resolve) => {
        resolve({
          success: false,
          message: 'A active or future month cannot be signed',
        });
      });
    }

    const filter = {
      user: user,
      month: month,
      year: year,
    };
    console.log(filter);
    let workdaysInMonth;
    try {
    workdaysInMonth = await this.findAll(filter);
    } catch (err) {
      console.log(err);
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          message: err.message,
          error: err,
        });
      });
    }
    console.log(workdaysInMonth);
    if (!workdaysInMonth || workdaysInMonth.length == 0) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          message: 'No entries to sign for provided month',
        });
      });
    }

    const hashVal = hash(workdaysInMonth);

    const signedMonth = new SignedMonthDto();
    signedMonth.year = year;
    signedMonth.month = month;
    signedMonth.user = user;
    signedMonth.objectHash = hashVal;

    return this.signedMonthService.create(signedMonth).then((res) => {
      return new Promise((resolve, reject) => {
        if (res) {
          resolve({
            success: true,
            message: 'Month was successfully signed',
          });
        }
        reject({
          success: false,
          message: 'Month could not be signed',
        });
      });
    });
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
