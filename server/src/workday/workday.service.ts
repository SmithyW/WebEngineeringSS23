import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workday, WorkdayDocument } from '@shared/models/workday.model';
import { Model, Types } from 'mongoose';
import { SignedMonthDto } from '../signed-month/dto/sign-request.dto';
import { SignedMonthService } from 'src/signed-month/signed-month.service';
import { createHash } from 'crypto'; 

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

  findAll(filter: { user?: string, month?: number, year?: number }, populate: boolean = true): Promise<Workday[]> {
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
    const mongoQuery = this.workdayModel.find(mongoQueryFilter);
    if (populate) {
      mongoQuery.populate('user');
    }
    return mongoQuery.exec();
  }

  findOne(id: string): Promise<Workday> {
    return this.workdayModel.findOne({ _id: id }).populate('user').exec();
  }

  async sign(user: string, month: number, year: number): Promise<{ success: boolean, message?: string }> {
    const today: Date = new Date(Date.now());
    console.log(month);
    const monthToSign: Date = new Date(year, month, 0);
    console.log(monthToSign);
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

    let workdaysInMonth: Workday[];
    try {
      workdaysInMonth = await this.findAll(filter, false);
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

    // Sort Objects in Array
    workdaysInMonth = this.orderWorkdays(workdaysInMonth);

    if (!workdaysInMonth || workdaysInMonth.length == 0) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          message: 'No entries to sign for provided month',
        });
      });
    }
    console.log(workdaysInMonth);
    const hashVal = createHash('sha256').update(JSON.stringify(workdaysInMonth)).digest('hex');
    console.log(hashVal);
    const signedMonth: SignedMonthDto = new SignedMonthDto();
    signedMonth.year = year;
    signedMonth.month = month;
    signedMonth.user = user;
    signedMonth.objectHash = hashVal;
    console.log(signedMonth);
    return this.signedMonthService.create(signedMonth).then((res) => {
      return new Promise((resolve, reject) => {
        console.log(res);
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

  /*
    * Internal private functions
  * */

  private orderWorkdays(arr: Workday[]) {
    return arr.map((element: Workday) => this.sortObj(element));
  }

  private sortObj<T>(obj: T): T {
      return Object.keys(obj)
      .sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {} as T);
  }
}
